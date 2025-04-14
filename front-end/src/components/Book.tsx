import { useEffect, useRef, useState } from "react";
import downChevron from "../assets/icons/down-chevron.svg";


interface child {
  type: string;
  class: string;
  text: string;
}

interface chapter {
  chapter: string;
  title: string;
  page: string;
}

interface Page {
  page: string;
  class: string;
  children: child[];
}

interface OpenBookProps {
  data: {
    cover: {
      title: string;
      author: string;
      year: string;
      class: string;
      image: string;
      children: child[];
    },
    table_of_contents: {
      title: string;
      class: string;
      chapters: chapter[];
    },
    pages: Page[],
  };
}

const OpenBook: React.FC<OpenBookProps> = ({ data }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([] as HTMLElement[][]);
  const divFirstRef = useRef<HTMLDivElement>(null);
  const divSecondRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeData();
  }, [data]);

  useEffect(() => {
    if (list.length > 0) {
      displayPage(currentPage);
    }
  }, [list, currentPage]);

  const initializeData = () => {
    // Crear el nodo del cover
    createCoverNode();

    // Crear los nodos para las páginas
    createPageNodes();

    // Establecer título y autor
    setTitle(data.cover.title);
    setAuthor(data.cover.author);

    // Dividir el texto en las páginas
    splitTextInPages();

    // Calcular las páginas
    const newList = calculatePages();

    // // Actualizar el estado con la nueva lista de páginas
    setList(newList);
  };

  // Función para crear el nodo del cover
  const createCoverNode = () => {
    for (const child of data.cover.children) {
      const node = document.createElement(child.type);
      node.className = child.class;
      node.innerHTML = child.text;
      node.setAttribute('type-page', 'cover');
      node.setAttribute('data-page-class', data.cover.class);
      divFirstRef.current?.appendChild(node);
    }
  };

  // Función para crear los nodos de las páginas
  const createPageNodes = () => {
    for (const page of data.pages) {
      for (const child of page.children) {
        const node = document.createElement(child.type);
        node.className = child.class;
        node.innerHTML = child.text;
        node.setAttribute('data-page', page.page);
        node.setAttribute('data-page-class', page.class);
        divFirstRef.current?.appendChild(node);
      }
    }
  };

  // Función para calcular las páginas y dividir el contenido
  const calculatePages = () => {
    let currentHeight = 0;
    let newList: HTMLElement[][] = [];
    let page: HTMLElement[] = [];
    let index = 0;
    let pageIndex = 0;

    const style = window.getComputedStyle(divFirstRef.current!);
    currentHeight += parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const divPage = divFirstRef.current?.childNodes as NodeListOf<HTMLElement>;

    const handlePageReset = () => {
      newList.push(page);
      page = [];
      currentHeight = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      pageIndex++;
    };

    handlePageReset();

    divPage.forEach((node) => {
      const children = node.childNodes as NodeListOf<HTMLElement>;
      if (node.getAttribute('type-page') === 'cover') {
        children.forEach((element) => {
          if (element.nodeType === Node.ELEMENT_NODE) {
            const childHeight = element.offsetHeight;

            currentHeight += childHeight;

            const clonedElement = element.cloneNode(true) as HTMLElement;
            const container = createPageContainer(node, pageIndex);
            container.appendChild(clonedElement);
            page.push(container);
          }
        });
      }
    });

    divPage.forEach((node) => {
      if (node.getAttribute('type-page') !== 'cover') {
        const children = node.childNodes as NodeListOf<HTMLElement>;
        const indexPage = node.getAttribute('data-page') as string;

        children.forEach((element) => {
          if (element.nodeType === Node.ELEMENT_NODE) {

            const childHeight = element.offsetHeight;

            if (index.toString() !== indexPage) {
              handlePageReset();
              index++;
            }
            else if (currentHeight + childHeight > divFirstRef.current!.offsetHeight) {
              handlePageReset();
            }

            currentHeight += childHeight;

            const clonedElement = element.cloneNode(true) as HTMLElement;
            const container = createPageContainer(node, pageIndex);
            container.appendChild(clonedElement);
            page.push(container);
          }
        });
      }
    });

    // Añadir la última página si tiene contenido
    if (page.length > 0) newList.push(page);

    return newList;
  };

    // Función para dividir el texto de los elementos
    const splitTextInPages = () => {
      divFirstRef.current?.childNodes.forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          splitTextElement(child as HTMLElement, divFirstRef.current!.offsetWidth);
        }
      });
    };
  
    // Función para calcular las páginas
    const splitTextElement = (element: HTMLElement, widthPage: number) => {
      const computedStyle = window.getComputedStyle(element);
      const fontSize = computedStyle.fontSize;
      const fontFamily = computedStyle.fontFamily;
      const fontWeight = computedStyle.fontWeight;
      const fontStyle = computedStyle.fontStyle;
      const textAling = computedStyle.textAlign;
      const lineHeight = computedStyle.lineHeight;
      const paddingLeft = parseFloat(computedStyle.paddingLeft);
      const paddingRight = parseFloat(computedStyle.paddingRight);
      const paddingTop = parseFloat(computedStyle.paddingTop);
      const paddingBottom = parseFloat(computedStyle.paddingBottom);
      const color = computedStyle.color;
  
      const width = widthPage - paddingLeft - paddingRight;
  
      // Crea un canvas para medir el ancho del texto
      const canvas = document.createElement("canvas") as HTMLCanvasElement;
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      context.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`;
  
      const text = element.innerText;
      const words = text.split(" ");
  
      // Crea un contenedor de filas para este elemento
      const elementContainer = document.createElement("div");
      elementContainer.setAttribute('type-page', element.getAttribute('type-page') as string);
      elementContainer.setAttribute('data-page', element.getAttribute('data-page') as string);
      elementContainer.setAttribute('data-page-class', element.getAttribute('data-page-class') as string);
      elementContainer.style.width = `100%`;
      elementContainer.style.maxWidth = `${width}px`;
  
      // Agrega padding-top si es distinto de 0
      if (paddingTop !== 0) {
        const div = document.createElement("div");
        div.style.height = paddingTop + "px";
        elementContainer.appendChild(div);
      }
  
      let currentLine = "";
      let lines = [];
  
      // Divide el texto en filas según el ancho máximo
      words.forEach((word) => {
        let testLine = currentLine + word + " ";
        let testWidth = context.measureText(testLine).width;
  
        if (testWidth > width) {
          // Si la línea excede el ancho, guárdala y empieza una nueva
          lines.push(currentLine.trim());
          currentLine = word + " ";
        } else {
          currentLine = testLine;
        }
      });
      lines.push(currentLine.trim()); // Agrega la última línea
  
      // Crear divs para cada línea y añadir estilos específicos por etiqueta
      lines.forEach((line) => {
        const lineDiv = document.createElement("div");
        lineDiv.innerText = line;
        lineDiv.style.whiteSpace = 'nowrap';
        lineDiv.style.fontSize = fontSize;
        lineDiv.style.fontFamily = fontFamily;
        lineDiv.style.fontWeight = fontWeight;
        lineDiv.style.fontStyle = fontStyle;
        lineDiv.style.textAlign = textAling;
        lineDiv.style.lineHeight = lineHeight;
        lineDiv.style.color = color;
        elementContainer.appendChild(lineDiv);
      });
  
      // Agrega padding-bottom si es distinto de 0
      if (paddingBottom !== 0) {
        const div = document.createElement("div");
        div.style.height = paddingBottom + "px";
        elementContainer.appendChild(div);
      }
  
      // Reemplaza el elemento original por el nuevo contenedor con filas
      element.replaceWith(elementContainer);
    }
  

  // Función para crear un contenedor para una página
  const createPageContainer = (node: HTMLElement, pageIndex: number) => {
    const container = document.createElement('div');
    container.style.width = node.style.width;
    container.style.maxWidth = node.style.maxWidth;
    container.setAttribute('data-page', pageIndex.toString());
    container.setAttribute('data-page-class', node.getAttribute('data-page-class') as string);
    return container;
  };

  const getPageItems = (page: number) => {
    const itemsPerPage = 2;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return list.slice(start, end);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(list.length / 2)) {
      setCurrentPage(currentPage + 1);
    } else {
      console.log('Ya estás en la última página.');
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      console.log('Ya estás en la primera página.');
    }
  };

  const displayPage = (page: number) => {
    const pageItems = getPageItems(page);
    if (pageItems.length === 0) return;

    // Clases predeterminadas
    const defaultClasses = "relative h-full overflow-auto py-16 flex flex-col items-center";

    // Refactor: función para manejar tanto divFirstRef como divSecondRef
    const renderPage = (ref: React.RefObject<HTMLDivElement>, items: HTMLElement[], title: string) => {
      if (ref.current) {
        ref.current.innerHTML = '';
        ref.current.className = defaultClasses;

        appendPageItems(ref.current, items);

        const pageElement = items[0];
        if (pageElement) {
          ref.current.appendChild(createContainer('top', title, null));  // Top container
          ref.current.appendChild(createContainer('bottom', null, pageElement.getAttribute('data-page') as string));  // Bottom container
        }
      }
    };

    // Llamada para ambos elementos divFirstRef y divSecondRef
    renderPage(divFirstRef, pageItems[0], title);
    renderPage(divSecondRef, pageItems[1] || [], title);  // pageItems[1] podría no estar presente
  };

  const createContainer = (position: 'top' | 'bottom', titleContent: string | null, pageContent: string | null) => {
    const container = document.createElement('div');
    container.classList.add('absolute', position === 'top' ? 'top-0' : 'bottom-0', 'w-full', 'flex', 'justify-center', 'items-center', 'px-16', 'py-5');

    if (titleContent) {
      const divAuthor = document.createElement('div');
      divAuthor.classList.add('font-serif', 'italic', 'text-xs');
      divAuthor.innerHTML = titleContent;
      container.appendChild(divAuthor);
    }

    if (pageContent) {
      const numberPage = document.createElement('div');
      numberPage.classList.add('font-serif', 'italic');
      numberPage.innerHTML = pageContent;
      container.appendChild(numberPage);
    }

    return container;
  };

  const appendPageItems = (container: HTMLElement, pageItems: HTMLElement[]) => {
    pageItems.forEach((element) => {
      const pageClass = element.getAttribute('data-page-class') as string;
      if (!container.classList.contains(pageClass)) {
        container.classList.add(pageClass);
      }
      container.appendChild(element);
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-amber-100 to-yellow-200">
      <div className="h-full flex items-center justify-center">
        <div className="w-full h-full max-w-6xl max-h-[80vh] aspect-[16/9] bg-[#f0e6d2] shadow-2xl transform perspective-1000 rotate-y-5 transition-all duration-500 ease-in-out hover:rotate-y-10 overflow-visible flex rounded-lg relative">
          {/* Efecto de hojas al costado derecho */}
          <div className="absolute right-0 top-1 bottom-1 w-2 bg-gradient-to-l from-amber-200 to-[#f0e6d2] rounded-r-sm"></div>
          <div className="absolute right-0 top-2 bottom-2 w-1 bg-gradient-to-l from-amber-300 to-[#f0e6d2] rounded-r-sm"></div>

          <div className="flex-1 relative overflow-hidden border-r border-amber-800/20">
            {/* Efecto de curvatura en la esquina superior izquierda */}
            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-amber-200 to-transparent rounded-br-[100%] pointer-events-none"></div>
            {/* Efecto de curvatura en la esquina inferior izquierda */}
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-amber-200 to-transparent rounded-tr-[100%] pointer-events-none"></div>

            <div ref={divFirstRef} className="relative h-full overflow-auto py-16 flex flex-col items-center">
            </div>
          </div>

          {/* Div mejorado para el medio del libro */}
          <div className="w-4 bg-gradient-to-b from-amber-800/10 via-amber-800/5 to-amber-800/10 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 via-transparent to-amber-900/30"></div>
            <div className="absolute inset-y-0 left-0 w-px bg-amber-950/20"></div>
            <div className="absolute inset-y-0 right-0 w-px bg-amber-950/20"></div>
          </div>

          <div className="flex-1 relative overflow-hidden border-l border-amber-800/20">
            {/* Efecto de curvatura en la esquina superior derecha */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-200 to-transparent rounded-bl-[100%] pointer-events-none"></div>
            {/* Efecto de curvatura en la esquina inferior derecha */}
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-amber-200 to-transparent rounded-tl-[100%] pointer-events-none"></div>

            <div ref={divSecondRef} className="relative h-full overflow-auto py-16 flex flex-col items-center">
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center bg-amber-800/10 rounded-b-lg">
          <button className="w-full flex justify-start hover:bg-amber-800/20 py-5 px-10" onClick={previousPage}>
            <img src={downChevron.src} alt="Previous page" className="text-amber-950 rotate-90" width={26} height={26} />
            <span className="sr-only">Previous page</span>
          </button>
          <div className="text-amber-800 text-lg font-serif italic whitespace-nowrap px-5">{`Página ${currentPage} de ${Math.ceil(list.length / 2)}`}</div>
          <button className="w-full flex justify-end hover:bg-amber-800/20 py-5 px-10" onClick={nextPage}>
            <img src={downChevron.src} alt="Previous page" className="text-amber-950 -rotate-90" width={26} height={26} />
            <span className="sr-only">Next page</span>
          </button>
        </div>
      </div>
    </div>
  );
}


export default OpenBook;
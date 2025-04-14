export async function GET({ params, request }) {
    return new Response(
        JSON.stringify(
            {
                "cover": {
                    "title": "El Reloj de las Arenas Perdidas - y las sombras del gato rata",
                    "author": "Juan Arturo",
                    "year": "2024",
                    "class": "justify-center",
                    "image": "url_portada.jpg",
                    "children": [
                        {
                            "type": "h1",
                            "class": "text-4xl font-bold text-center font-serif italic",
                            "text": "El Reloj de las Arenas Perdidas"
                        },
                        {
                            "type": "h2",
                            "class": "text-2xl font-semibold text-center font-serif italic",
                            "text": "y las sombras del gato rata"
                        },
                        {
                            "type": "h3",
                            "class": "text-lg text-center font-serif italic",
                            "text": "por Juan Arturo"
                        },
                        {
                            "type": "h3",
                            "class": "text-center text-sm font-serif italic",
                            "text": "&copy; Derechos Reservados 2024"
                        }
                    ]
                },
                "table_of_contents": {
                    "title": "Tabla de Contenidos",
                    "class": "text-center py-5",
                    "chapters": [
                        { "chapter": "1", "title": "El Encuentro", "page": "3" },
                        { "chapter": "2", "title": "El Primer Salto", "page": "5" },
                        { "chapter": "3", "title": "Consecuencias No Deseadas", "page": "7" },
                        { "chapter": "4", "title": "La Advertencia de los Guardianes", "page": "9" },
                        { "chapter": "5", "title": "Las Huellas del Pasado", "page": "11" },
                        { "chapter": "6", "title": "Un Precio que Pagar", "page": "13" },
                        { "chapter": "7", "title": "El Viaje hacia el Origen", "page": "15" },
                        { "chapter": "8", "title": "El Templo de las Arenas", "page": "17" },
                        { "chapter": "9", "title": "El Sacrificio Final", "page": "19" },
                        { "chapter": "10", "title": "El Regreso", "page": "21" }
                    ]
                },
                "pages": [
                    {
                        "page": "1",
                        "class": "justify-center",
                        "children": [
                            {
                                "type": "h1",
                                "class": "font-bold text-base font-serif italic pb-1 px-16",
                                "text": "Intrucción"
                            },
                            {
                                "type": "p",
                                "class": "text-sm font-serif italic px-16",
                                "text": "Un grupo de jóvenes descubre un antiguo artefacto llamado el 'Reloj de las Arenas Perdidas', el cual tiene el poder de alterar el tiempo. Sin embargo, cada uso de este objeto mágico o tecnológico desencadena eventos que pueden afectar sus propias vidas y el equilibrio del mundo. A medida que exploran el verdadero poder del reloj, comienzan a darse cuenta de que cada decisión tiene repercusiones mucho más profundas de lo que imaginaban. Con el tiempo corriendo en su contra, deben encontrar una manera de devolverlo a su lugar de origen antes de que el caos sea irreversible."
                            }
                        ]
                    },
                    {
                        "page": "2",
                        "class": "justify-start",
                        "children": [
                            {
                                "type": "h1",
                                "class": "font-bold text-base font-serif italic pb-1 px-16",
                                "text": "Capítulo 1: El Encuentro"
                            },
            
                            {
                                "type": "p",
                                "class": "text-sm font-serif italic pb-5 px-16",
                                "text": "Los personajes principales —tres amigos inseparables— encuentran una caja antigua en una tienda de antigüedades al final de una calle que parece 'aparecer y desaparecer' en el mapa. La tienda tiene un aura extraña y el propietario, un anciano misterioso, les advierte sobre los peligros de la caja. Sin embargo, su curiosidad los supera y deciden llevarla consigo. Esa noche, descubren el Reloj de las Arenas Perdidas y se dan cuenta de su capacidad para cambiar el tiempo, aunque sin saber aún el precio que tendrían que pagar por cada salto temporal que realicen. Al final de la calle, en una esquina oscura, descubrieron una tienda de antigüedades que parecía haber estado allí durante siglos.",
                            },
                            {
                                "type": "p",
                                "class": "text-sm font-serif italic pb-5 px-16",
                                "text": "La puerta crujió al abrirse, y dentro, el aire estaba cargado de polvo y misterio. El lugar estaba lleno de objetos extraños y fascinantes: relojes rotos, espejos antiguos, libros encuadernados en cuero y artefactos que parecían fuera de lugar, como si vinieran de otras dimensiones o tiempos. En el centro de la tienda, sobre una mesa de madera vieja, descansaba una caja de aspecto peculiar. Era de madera oscura, tallada con símbolos que ninguno de los tres había visto antes. La caja emitía un leve resplandor, como si estuviera viva."
                            },
                            {
                                "type": "p",
                                "class": "text-sm font-serif italic pb-5 px-16",
                                "text": "Intrigados, se acercaron a ella, pero antes de que pudieran tocarla, el propietario de la tienda, un anciano de ojos profundos y expresión severa, se les acercó rápidamente. \"Debo advertirles\", dijo con voz grave, esa caja no es como cualquier otra. Tiene el poder de alterar el tiempo mismo, pero también conlleva un precio que nadie ha podido pagar sin sufrir las consecuencias. Si la abren, el tiempo comenzará a desmoronarse a su alrededor, y cada decisión que tomen podría alterar el curso de sus vidas para siempre. A pesar de la advertencia, la curiosidad de los amigos fue más fuerte que el miedo. Habían oído leyendas sobre artefactos poderosos y misteriosos, pero nada los había preparado para esto. Pensaron que quizás el anciano estaba simplemente tratando de asustarlos, o que solo hablaba de manera exagerada para vender la caja."
                            },
                            {
                                "type": "p",
                                "class": "text-sm font-serif italic pb-5 px-16",
                                "text": "Sin pensarlo mucho, decidieron comprarla. Esa misma noche, reunidos en el apartamento de uno de ellos, decidieron abrir la caja. Al hacerlo, un brillo cegador llenó la habitación, y un objeto extraño apareció en su interior: un reloj de arena dorado, con partículas que parecían moverse en direcciones opuestas. El reloj emitía un zumbido suave, casi hipnótico. Sin saber cómo, uno de ellos tocó el reloj, y al instante, el mundo a su alrededor comenzó a cambiar. En un abrir y cerrar de ojos, se encontraron en un escenario diferente, uno que no recordaban haber experimentado. El tiempo se había distorsionado: las sombras se alargaban y se contraían, y las horas parecían no tener sentido. En ese momento, comprendieron que el reloj no era solo un objeto decorativo. Era un artefacto de poder inmenso, capaz de moverlos a través del tiempo. Pero aún no sabían las reglas. ¿Podían controlar el tiempo o era el tiempo quien los controlaba a ellos? Aunque fascinados, también se sintieron abrumados. No entendían el alcance de lo que acababan de liberar, pero lo único que sabían era que no podían deshacer lo que habían hecho. El reloj, por alguna razón, los había elegido, y ahora el destino de sus vidas estaba atado a su poder. En su mente, surgió la pregunta inquietante: ¿qué precio tendrían que pagar por cada salto temporal que realizaran?"
                            }
                        ],
                    },
                    {
                        "page": "3",
                        "class": "justify-start",
                        "children": [
                            {
                                "type": "h1",
                                "class": "font-bold text-base font-serif italic pb-1 px-16",
                                "text": "Capítulo 2: El Primer Salto",

                            },
                            {
                                "type": "p",
                                "class": "text-sm font-serif italic px-16",
                                "text": "Uno de los amigos decide usar el reloj para arreglar un error en el pasado reciente, pero cuando despierta al día siguiente, nota que sus cambios han afectado cosas inesperadas. Su error los obliga a comprender que cada uso del reloj tiene un costo. A pesar del riesgo, sienten la necesidad de continuar explorando sus límites de cada persona es lo que la vida te hace mas fuerte.",

                            },
                        ]
                    },
                    {
                        "page": "4",
                        "class": "justify-start",
                        "children": [
                            {
                                "type": "h1",
                                "class": "font-bold text-base font-serif italic pb-1 px-16",
                                "text": "Capítulo 3: Consecuencias No Deseadas",

                            },
                            {
                                "type": "p",
                                "class": "text-sm font-serif italic px-16",
                                "text": "Después de un uso excesivo del reloj, comienzan a suceder fenómenos extraños: los personajes ven fragmentos de realidades alternativas y personas del pasado en su vida cotidiana. La relación entre los amigos empieza a deteriorarse debido a los efectos del reloj y sus consecuencias en el presente.",

                            },
                        ]
                    },
                    {
                        "page": "5",
                        "class": "justify-start",
                        "children": [
                            {
                                "type": "h1",
                                "class": "font-bold text-base font-serif italic pb-1 px-16",
                                "text": "Capítulo 4: La Advertencia de los Guardianes",

                            },
                            {
                                "type": "p",
                                "class": "text-sm font-serif italic px-16",
                                "text": "Un personaje enigmático aparece en sus vidas, advirtiéndoles sobre el Reloj y mencionando que es un artefacto de una sociedad antigua conocida como \"Los Guardianes de las Arenas\". Según este personaje, si el reloj sigue siendo usado, podría causar un \"efecto dominó\" en el tiempo, desencadenando catástrofes globales.",

                            },
                        ]
                    },
                    {
                        "page": "6",
                        "class": "justify-start",
                        "children": [
                            {
                                "type": "h1",
                                "class": "font-bold text-base font-serif italic pb-1 px-16",
                                "text": "Capítulo 5: Las Huellas del Pasado",

                            },
                            {
                                "type": "p",
                                "class": "text-sm font-serif italic px-16",
                                "text": "Los protagonistas deciden investigar sobre los Guardianes de las Arenas. Visitan bibliotecas antiguas, museos y archivos, descubriendo que este reloj fue robado de un templo secreto hace siglos. Aquí también conocen leyendas de otros usuarios anteriores, todos los cuales pagaron un precio terrible.",

                            },
                        ]
                    },
                    {
                        "page": "7",
                        "class": "justify-start",
                        "children": [
                            {
                                "type": "h1",
                                "class": "font-bold text-base font-serif italic pb-1 px-16",
                                "text": "Capítulo 6: Un Precio que Pagar",

                            },
                            {
                                "type": "p",
                                "class": "text-sm font-serif italic px-16",
                                "text": "Uno de los personajes usa el reloj para salvar a un ser querido en peligro, a pesar de las advertencias de los Guardianes. Este acto tiene consecuencias trágicas para él, y los otros dos amigos comprenden que, si no detienen el uso del reloj, podrían perder a alguien que aman o sus propias vidas.",

                            },
                        ]
                    },
                    {
                        "page": "8",
                        "class": "justify-start",
                        "children": [
                            {
                                "type": "h1",
                                "class": "font-bold text-base font-serif italic pb-1 px-16",
                                "text": "Capítulo 7: El Viaje hacia el Origen",

                            },
                            {
                                "type": "p",
                                "class": "text-sm font-serif italic px-16",
                                "text": "Para detener la destrucción que los eventos han comenzado a desencadenar, los amigos emprenden un viaje a una tierra lejana donde creen que podrán devolver el reloj. Sin embargo, se enfrentan a enemigos y pruebas que ponen a prueba sus miedos, su lealtad y su valor.",

                            },
                        ]
                    },
                    {
                        "page": "9",
                        "class": "justify-start",
                        "children": [

                            {
                                "type": "h1",
                                "class": "font-bold text-base font-serif italic pb-1 px-16",
                                "text": "Capítulo 8: El Templo de las Arenas",

                            },
                            {
                                "type": "p",
                                "class": "text-sm font-serif italic px-16",
                                "text": "Llegan al Templo de las Arenas y deben resolver un acertijo o superar una prueba que involucra sus recuerdos y sacrificios personales. En este proceso, descubren verdades ocultas sobre el reloj y sobre ellos mismos. Aquí se dan cuenta de que, para devolver el reloj, uno de ellos deberá renunciar a sus propios recuerdos del pasado.",

                            },
                        ]
                    },
                    {
                        "page": "10",
                        "class": "justify-start",
                        "children": [
                            {
                                "type": "h1",
                                "class": "font-bold text-base font-serif italic pb-1 px-16",
                                "text": "Capítulo 9: El Sacrificio Final",

                            },
                            {
                                "type": "p",
                                "class": "text-sm font-serif italic px-16",
                                "text": "Para que el reloj vuelva a su lugar y detenga el efecto dominó, uno de los amigos decide quedarse en el templo, sacrificando su conexión con el mundo actual. Este sacrificio permite devolver el reloj a su lugar y cierra la conexión con el tiempo alternativo, restaurando el equilibrio.",

                            },
                        ]
                    },
                    {
                        "page": "11",
                        "class": "justify-start",
                        "children": [
                            {
                                "type": "h1",
                                "class": "font-bold text-base font-serif italic pb-1 px-16",
                                "text": "Capítulo 10: El Regreso",

                            },
                            {
                                "type": "p",
                                "class": "text-sm font-serif italic px-16",
                                "text": "Los dos amigos restantes regresan a su vida cotidiana, aunque con el recuerdo de lo sucedido un poco borroso y la sensación de que algo importante ocurrió, aunque no puedan recordarlo con claridad. En el último momento, una pequeña pista o recuerdo revela al lector que el reloj ha dejado una marca imborrable en sus vidas, recordándoles el sacrificio que hicieron.",

                            }
                        ]
                    }
                ]
            }
        )
    )
}
import React from 'react';


interface Item {
  title: string;
  description: string;
  code: string;
  bc: number;
}

interface TableProps {
  listaalgo: Item[];
  listar2: Item[];
  listar3: Item[];
}

const FormularioAdvancedMikrotikProtection: React.FC<TableProps> = ({ listaalgo, listar2, listar3 }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mx-4 my-8">
      <div className="text-gray-950 shadow-2xl rounded-lg p-6 w-full ring-2 ring-blue-500">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="table-auto w-full border-spacing-2 border-slate-600">
            <thead>
              <tr className="bg-gray-700 text-gray-200">
                <th className="border-slate-700 p-2 border">Mikrotik Port Service</th>
                <th className="border-slate-700 p-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {listaalgo.map((item, index) => (
                <tr key={index} className="text-gray-800">
                  <td className="p-2 border border-slate-700">
                    <p className={`text-sm lg:text-3xl font-bold ${item.bc === 1 ? "text-orange-500" : "text-red-500"} justify-center`}>
                      {item.title}
                    </p>
                  </td>
                  <td className="border-slate-700 p-2 border pl-4">
                    <p className="text-gray-400 mt-4">
                      {item.description}
                      <br />
                      <section>
                        {/* <CodeBlock clientLoad code={item.code} language="javascript" /> */}
                      </section>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
            <thead>
              <tr className="bg-gray-700 text-gray-200">
                <th className="border-slate-700 p-2 border">Advanced Router Security</th>
                <th className="border-slate-700 p-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {listar2.map((item, index) => (
                <tr key={index} className="text-gray-800">
                  <td className="p-2 border border-slate-700">
                    <p className={`text-sm lg:text-3xl font-bold ${item.bc === 1 ? "text-orange-500" : "text-red-500"} justify-center`}>
                      {item.title}
                    </p>
                  </td>
                  <td className="border-slate-700 p-2 border pl-4">
                    <p className="text-gray-400 mt-4">
                      {item.description}
                      <br />
                      <section>
                        {/* <CodeBlock clientLoad code={item.code} language="javascript" /> */}
                      </section>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
            <thead>
              <tr className="bg-gray-700 text-gray-200">
                <th className="border-slate-700 p-2 border">Advanced Router Security</th>
                <th className="border-slate-700 p-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {listar3.map((item, index) => (
                <tr key={index} className="text-gray-800">
                  <td className="p-2 border border-slate-700">
                    <p className={`text-sm lg:text-2xl font-bold ${item.bc === 1 ? "text-orange-500" : "text-red-500"} justify-center`}>
                      {item.title}
                    </p>
                  </td>
                  <td className="border-slate-700 p-2 border pl-4">
                    <p className="text-gray-400 mt-4">
                      {item.description}
                      <br />
                      <section>
                        {/* <CodeBlock clientLoad code={item.code} language="javascript" /> */}
                      </section>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormularioAdvancedMikrotikProtection;

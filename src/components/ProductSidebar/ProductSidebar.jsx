import image from '../../assets/products/1kit.webp';
export default function ProductSidebar() {
  return (
    <aside className="lg:sticky lg:top-6 self-start w-full">
      <div className="border-2 border-gray-200 bg-white p-5 shadow-lg rounded-md text-center">
        <h3 className="text-gray-800 font-black text-xl md:text-2xl leading-tight mb-6">
          Finally <br /> Stop Snoring
        </h3>

        <div className="relative mb-6 flex justify-center">
          {/* Substitua pelo caminho real da sua imagem nos assets */}
          <img
            src={image}
            alt="Mushroom Coffee Labs Pro"
            className="w-40 h-auto object-contain"
          />
        </div>

        <a
          href="#/special-offer"
          className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg shadow-md transition-all group overflow-hidden"
        >
          <div className="flex items-stretch h-full">
            {/* Ícone da Seta Lateral */}
            <div className="bg-gray-800 p-4 flex items-center justify-center group-hover:bg-gray-900 transition-colors">
              <span className="text-2xl">➔</span>
            </div>

            {/* Texto do Botão */}
            <div className="flex-1 p-3 flex flex-col justify-center text-left leading-none overflow-hidden">
              <span className="text-[10px] uppercase tracking-tighter opacity-90 mb-1">
                Get 30% OFF
              </span>
              {/* Adicionado truncate (overflow-hidden text-ellipsis) para evitar quebra em telas muito estreitas */}
              <span className="text-lg md:text-xl font-black whitespace-nowrap truncate">
                Mushroom Coffee Labs Pro
              </span>
            </div>
          </div>
        </a>

        <p className="mt-4 text-[10px] text-gray-400 font-medium uppercase tracking-widest">
          Limited Stock Available
        </p>
      </div>
    </aside>
  );
}

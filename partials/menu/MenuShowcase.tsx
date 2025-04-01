import CategorySection from "./CategorySection";
import CategorySelector from "./CategorySelector";


export default function MenuShowcase() {

    return (
        <div className="w-5/6 h-full">
            <div className="mb-15 pt-5 pb-20 border-b-2 border-b-gray-400 shadow-lg">
                <h1 className="text-center text-secondary text-5xl mb-5">Menú</h1>
                <p className="text-center text-accent text-xl">Conoce nuestras bebidas y alimentos</p>
            </div>
            <CategorySelector />
            <CategorySection />
        </div>
    )
}
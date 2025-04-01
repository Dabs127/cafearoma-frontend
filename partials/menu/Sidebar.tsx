
const categories = [
    'Cafés',
    'Panaderia y Reposteria',
    'Desayunos',
    'Sandwiches y Bocadillos',
    'Jugos'
]

export default function Sidebar() {

    return (
        <section className="w-1/6 h-screen bg-secondary">
            <ul className="w-full h-full text-white mt-10">
                {
                    categories.map((category) => {
                        return <li className="w-full h-15 flex justify-center items-center text-lg hover:bg-yellow-950">{category}</li>
                    })
                }
            </ul>
        </section>
    )
}
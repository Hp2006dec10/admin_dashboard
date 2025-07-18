import TopNav from "./components/topnav";
import Navbar from "./components/leftnav";
export default function Home() {
  return (
    <div className="dark:text-black">
      <TopNav useSave={false}/>
      <main className="flex flex-wrap w-full">
      <Navbar />
      <div className="w-5/6">
        <div className="font-[family-name:var(--font-geist-sans)] bg-gray-100 p-25 flex flex-col gap-10">
          <p className="font-bold text-[30px]">Dashboard</p>
          <div>          
            <p className="font-semibold text-[20px] py-2">Sample para 1</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam consequuntur omnis sunt eveniet? Tempore ipsum eaque exercitationem sapiente consectetur at beatae qui dolor id voluptatibus illum, autem delectus fugit iure?</p>
          </div>
          <div>
            <p className="font-semibold text-[20px] py-2">Sample para 2</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio, nam in ea veniam deserunt amet atque dicta iusto et nihil commodi harum repellat corporis tempore nisi similique dolorum quos aut.</p>
          </div>
          <div>
            <p className="font-semibold text-[20px] py-2">Sample para 3</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio, nam in ea veniam deserunt amet atque dicta iusto et nihil commodi harum repellat corporis tempore nisi similique dolorum quos aut.</p>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}

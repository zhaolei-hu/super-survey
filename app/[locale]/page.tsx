import Authentication from './_components/authentication'
import Header from '@/components/header/header'

export default function Page() {
  return (
    <>
      <Header></Header>
      <main className="w-screen h-[calc(100vh-3.5rem)] flex flex-col items-center">
        <div className="flex-grow min-h-[560px] w-2/3 flex items-center">
          <Authentication />
        </div>
      </main>
    </>
  )
}

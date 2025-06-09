import Login from "@/components/Login";


const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src="/logo2.png" className="h-[20vh] mt-1" />
      <div className="p-3 mb-3 w-[70vw] bg-secundario rounded-md flex flex-col items-center justify-center ">
        <h1 className="text-5xl font-bold cuarto">¡Bienvenido!</h1>
        <span className="text-2xl cuarto">Ingresa tus credenciales para ingresar</span>
      </div>
      <Login/>
    </div>
  );
};
export default Landing;

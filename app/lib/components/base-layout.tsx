import Region from "./region";
import Search from "./search";

const BaseLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <main className="p-5 md:p-10 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <Search />
        <Region />
      </div>
      <section className="p-8 md:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 md:gap-10">
        {children}
      </section>
    </main>
  );
};

export default BaseLayout;

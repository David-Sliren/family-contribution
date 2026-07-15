import { FormContribute } from "./FormContribute";
import { InfoContribute } from "./InfoContribute";

export const Index = () => {
  return (
    <main className="flex-grow flex items-center justify-center py-12 md:py-20">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <section className="md:col-span-5 flex flex-col gap-6 pt-4 px-4 md:px-0">
          <InfoContribute />
        </section>
        <section className="md:col-span-7">
          <FormContribute />
        </section>
      </div>
    </main>
  );
};

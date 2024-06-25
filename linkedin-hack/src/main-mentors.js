import * as React from "react";

function MyComponent() {
  return (
    <div className="flex flex-col items-start px-16 pt-20 font-medium bg-stone-100 max-md:px-5">
      <div className="flex flex-col pt-2.5 pb-20 mt-14 ml-20 max-w-full bg-white w-[1512px] max-md:mt-10">
        <div className="flex flex-col px-14 text-2xl text-black max-md:px-5 max-md:max-w-full">
          <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex gap-5 self-end mt-12 max-md:mt-10">
              <div className="flex-auto">Your mentors</div>
              <div className="flex-auto">Your mentees</div>
            </div>
            <div className="justify-center px-14 py-7 bg-white border-4 border-blue-400 border-solid rounded-[55px] max-md:px-5">
              Create Profile
            </div>
          </div>
          <div className="shrink-0 mt-4 mr-20 h-1 bg-lime-900 border-lime-900 border-solid border-[3px] max-md:max-w-full" />
        </div>
        <div className="shrink-0 border-solid bg-zinc-400 border-[3px] border-zinc-400 h-[3px] max-md:max-w-full" />
        <div className="flex flex-col px-16 mt-20 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
            <div className="flex gap-5 text-2xl text-zinc-500">
              <div className="shrink-0 rounded-full bg-zinc-300 h-[125px] w-[125px]" />
              <div className="flex-auto my-auto">
                Sayada Arouna <span className="text-zinc-500">1st</span>
              </div>
            </div>
            <div className="items-start self-start px-16 pt-7 pb-3.5 mt-3.5 text-3xl text-black whitespace-nowrap bg-white border-4 border-blue-400 border-solid rounded-[55px] max-md:pr-5 max-md:pl-6">
              Message
            </div>
          </div>
          <div className="shrink-0 self-end mt-4 max-w-full h-px bg-black border border-black border-solid w-[1237px]" />
          <div className="flex gap-1.5 mt-14 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="shrink-0 self-start mt-1.5 rounded-full bg-zinc-300 h-[125px] w-[125px]" />
            <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                <div className="flex-auto self-end mt-9 text-2xl text-zinc-500">
                  SpongeBob Square Pants{" "}
                  <span className="text-zinc-500">1st</span>
                </div>
                <div className="items-start px-16 pt-7 pb-3.5 text-3xl text-black whitespace-nowrap bg-white border-4 border-blue-400 border-solid rounded-[55px] max-md:pr-5 max-md:pl-6">
                  Message
                </div>
              </div>
              <div className="shrink-0 mt-16 h-px bg-black border border-black border-solid max-md:mt-10 max-md:max-w-full" />
            </div>
          </div>
          <div className="self-center text-4xl text-black border border-solid border-black border-opacity-0 mt-[682px] max-md:mt-10">
            <span className="font-semibold text-blue-400">Request</span>
            <span className="font-semibold"> another mentor</span>
          </div>
        </div>
      </div>
    </div>
  );
}


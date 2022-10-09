import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-start rounded-sm mx-auto w-1/2">
      <h2 className="text-3xl m-5">About</h2>
      <p className="text-center w-1/2">
        If you work on a technical support or customer service function,
        one of our responsibilities would be a well documented
        note.
        <br />
        <br />
        I've had difficulties manually documenting transactions, that's why
        I've come up with this app.<br />
        This has helped me a lot in easing documenting transactions and I hope this helps you too.
        <br />
        <br />
        This uses chrome storage sync which gets synced to your account but I haven't tested out that feature yet.
        Meanwhile, if you need to backup your notes, make use of the export function.
        </p>
    </div>
  )
}

const styles = {
  button: "px-3 py-2 rounded-md text-sm font-medium cursor-pointer bg-gray-900 text-white hover:bg-white hover:text-black hover:border-2 border-black active:bg-gray-700 active:text-white m-3"
}

export default About
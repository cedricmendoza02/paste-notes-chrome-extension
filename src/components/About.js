import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-start rounded-sm mx-auto w-1/2 shadow-md h-max">
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
        Due to the inflation, I hope you wouldn't mind me asking for a bit of donation.<br />
        I created this app out of my free time and plan to pursue my career in web and mobile development.<br />
        This would help me a lot in pursuing this endeavor.
      </p>
      <button className={styles.button}>Donate</button>
    </div>
  )
}

const styles = {
  button: "px-3 py-2 rounded-md text-sm font-medium cursor-pointer bg-gray-900 text-white hover:bg-white hover:text-black hover:border-2 border-black active:bg-gray-700 active:text-white m-3"
}

export default About
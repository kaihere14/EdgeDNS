import React from "react";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import Solution from "../components/Solution";
import HowItWorks from "../components/HowItWorks";
import UseCases from "../components/UseCases";
import CodeSnippet from "../components/CodeSnippet";
import TechStack from "../components/TechStack";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <UseCases />
      <CodeSnippet />
      <TechStack />
      <FinalCTA />
      <Footer />
    </>
  );
};

export default Home;

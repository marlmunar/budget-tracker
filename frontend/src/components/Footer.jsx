const Footer = ({ bg = "bg-[#FFE779]" }) => {
  return (
    <footer
      className={`mt-auto p-2 ${bg} dark:bg-[#2b2d2f] dark:text-[#f0f0f0]`}
    >
      <div className="lg:px-10 text-[0.55rem] md:text-xs">
        <div className="container px-5 mx-auto md:px-10 min-h-4 md:min-h-10 flex items-center justify-between">
          <p>
            Copyright &#169; 2025{" "}
            <span className="font-semibold"> Budgetarians' Log</span>
          </p>
          <p>
            Project by <span className="font-semibold">marl.dev</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

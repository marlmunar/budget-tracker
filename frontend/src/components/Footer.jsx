const Footer = () => {
  return (
    <footer className="mt-auto p-2 bg-amber-400">
      <div className="text-[0.65rem] md:text-xs">
        <div className="container px-5 mx-auto md:px-10 min-h-10 md:flex items-center justify-between">
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

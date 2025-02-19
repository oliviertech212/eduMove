"use client";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  
  
  return (
    <div className="w-full flex flex-col-reverse md:flex-row-reverse ">
      {/* <div className="landingpage flex flex-col md:w-1/2 justify-center items-center min-h-screen">
       
      </div> */}
      <div className="text-xl w-fit m-auto bg-background rounded-xl p-5 sm:p-20">
        <h1 className="text-4xl font-bold text-primary">Expect More </h1>
        <ul className="list-disc list-inside  ">
            <li className="">
                <strong>Route Optimization</strong>
                <ul className="list-disc list-inside ml-5 text-left ">
                    <li>Direct travel calculations to minimize bus changes.</li>
                    <li>Cost estimation for students.</li>
                </ul>
            </li>
            <li>
                <strong>Real-Time Notifications</strong>
                <ul className="list-disc list-inside ml-5 text-left">
                    <li>Alerts for departure and arrival times.</li>
                    <li>Emergency notifications for delays.</li>
                </ul>
            </li>
            <li>
                <strong>Dynamic Bus Scheduling</strong>
                <ul className="list-disc list-inside ml-5 text-left">
                    <li>Data-driven scheduling to match demand with availability.</li>
                    <li>Prioritize underserved locations.</li>
                </ul>
            </li>
            <li>
                <strong>Data Analytics</strong>
                <ul className="list-disc list-inside ml-5 text-left">
                    <li>Visual dashboards for transport insights.</li>
                    <li>Predictive models for future resource needs.</li>
                </ul>
            </li>
        </ul>
    </div>
      <div className="relative landingpage flex flex-col md:w-1/2 justify-center items-center min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
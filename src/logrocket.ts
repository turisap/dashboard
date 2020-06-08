import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

setupLogRocketReact(LogRocket);

LogRocket.init(process.env.LOGROCKET_ID as string);

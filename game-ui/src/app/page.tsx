"use client";

import MainMenu from "@/app/pages/mainMenu";
import Map from "@/app/pages/map";
import Transition from "@/components/transition";
import { useState } from "react";

export default function Home() {
    const [state, setState] = useState("menu");

    const transition = (page: string) => {
        setState(page);
    };

    const pages = {
        menu: <MainMenu transition={transition} />,
        map: <Map transition={transition} />,
        transition: <Transition />,
    };

    return pages[state as keyof typeof pages];
}

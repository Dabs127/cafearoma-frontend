"use client";

import { useState } from "react";

export const useCategoryFilter = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    return { selectedCategory, setSelectedCategory };
}
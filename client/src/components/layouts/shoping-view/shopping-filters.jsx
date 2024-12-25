import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { filterOptions } from "@/config";
import React from "react";

function ShoppingFilters({ filters, handleFilter }) {
    return (
        <div className="bg-background rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className="text-lg font-extrabold">Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {Object.keys(filterOptions).map((keyItem) => (
                    <div>
                        <div>
                            <h3 className="text-base font-bold">{keyItem}</h3>
                            <div className="grid gap-2 mt-2">
                                {filterOptions[keyItem].map((option) => (
                                    <Label className="flex font-medium items-center gap-2 ">
                                        <Checkbox
                                            checked={
                                                filters &&
                                                Object.keys(filters).length > 0 &&
                                                filters[keyItem] &&
                                                filters[keyItem].indexOf(option.id) > -1
                                            }
                                            onCheckedChange={() => handleFilter(keyItem, option.id)}
                                        />
                                        {option.label}
                                    </Label>
                                ))}
                            </div>
                        </div>
                        <Separator />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShoppingFilters;

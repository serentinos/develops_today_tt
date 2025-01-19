"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IPopulationCount } from "@/models/countryApiResponse";

const chartConfig = {
  year: {
    label: "Year",
  },
  value: {
    label: "Population",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function PopulationChart({
  populationData,
}: {
  populationData: IPopulationCount[];
}) {
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Country Population over years</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={populationData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="value"
                  labelFormatter={(label, payload) => {
                    return payload[0].payload.year + " Year";
                  }}
                />
              }
            />
            <Bar dataKey={"value"} fill={`var(--color-${"value"})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

import Tasks from "@/components/Home/Tasks";
import NinetyDaysWelcome from "@/components/reusables/NinetyDaysWelcome";
import RoadmapTasks from "@/components/Home/RoadmapTasks";
import CompletedTasks from "@/components/Home/CompletedTasks";
import type { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoadmapStats from "@/components/reusables/RoadmapStats";
export const metadata: Metadata = {
  title: "Compass",
  description: "Dashbboard",
};
export default function Home() {
  return (
    <section className="space-y-5 pt-4">
      {/* <BecomeATalent /> */}
      <NinetyDaysWelcome />
      <RoadmapStats />
      <Tabs defaultValue="tasks">
        <TabsList className="w-full">
          <TabsTrigger
            value="tasks"
            className="flex-1 data-[state=inactive]:text-[#95969A]"
          >
            Today's Tasks
          </TabsTrigger>
          <TabsTrigger
            value="roadmap"
            className="flex-1 data-[state=inactive]:text-[#95969A]"
          >
            90 Days Roadmap
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="flex-1 data-[state=inactive]:text-[#95969A]"
          >
            Completed Tasks
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tasks">
          <Tasks />
        </TabsContent>
        <TabsContent value="roadmap">
          <RoadmapTasks />
        </TabsContent>
        <TabsContent value="completed">
          <CompletedTasks />
        </TabsContent>
      </Tabs>
    </section>
  );
}

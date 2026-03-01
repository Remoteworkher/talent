"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToolBySlug, useGenerateToolOutput } from "@/hooks/useCareerTools";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import ToolFormWrapper from "@/components/reusables/ToolFormWrapper";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProcessModal from "@/components/reusables/ProcessModal";
import { useCareerStore } from "@/lib/store/useCareerStore";

type Mode = "annual" | "monthly";

const modeLabel = (mode: Mode) => (mode === "annual" ? "Annual" : "Monthly");

export default function TaxCalculatorPage() {
  const router = useRouter();
  const slug = "tax-calculator";
  const { data: tool, isLoading: isLoadingTool } = useToolBySlug(slug);
  const generateMutation = useGenerateToolOutput(slug);
  const addResult = useCareerStore((state) => state.addResult);

  const [mode, setMode] = useState<Mode>("annual");
  const [isProcessing, setIsProcessing] = useState(false);

  // Form fields
  const [grossIncome, setGrossIncome] = useState("");
  const [pension, setPension] = useState("");
  const [nhf, setNhf] = useState("");
  const [rentPaid, setRentPaid] = useState("");
  // Additional deductions
  const [nhis, setNhis] = useState("");
  const [lifeInsurance, setLifeInsurance] = useState("");
  const [houseRent, setHouseRent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!grossIncome) {
      toast.error("Please enter your gross income.");
      return;
    }

    setIsProcessing(true);
    try {
      const payload = {
        mode,
        calculation_mode: mode,
        gross_income: grossIncome,
        pension_contribution: pension || "0",
        nhf: nhf || "0",
        rent_paid: rentPaid || "0",
        nhis_contribution: nhis || "0",
        life_insurance: lifeInsurance || "0",
        house_rent: houseRent || "0",
      };
      const data = await generateMutation.mutateAsync(payload);
      addResult(slug, data);
      toast.success("Tax calculated successfully!");
      router.push("/career-tools/career/tax-calculator/result");
    } catch (error: any) {
      console.error("Tax calculation error:", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Failed to calculate tax.");
      setIsProcessing(false);
    }
  };

  if (isLoadingTool) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#322FEB]" />
      </div>
    );
  }

  const icon = tool?.icon_url || "/sparkling-line.svg";

  return (
    <div className="bg-[#FFFCFD] min-h-screen md:px-8 py-8 flex flex-col items-center">
      <div className="w-full max-w-[1000px]">
        {/* Processing Modal */}
        <Dialog open={isProcessing}>
          <DialogContent 
            className="sm:max-w-md p-0 overflow-hidden border-none" 
            showCloseButton={false}
            onPointerDownOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
          >
            <div className="p-10 bg-white">
              <ProcessModal 
                title="Calculating Tax"
                description="AI is computing your tax breakdown. Please wait a few seconds..."
              />
            </div>
          </DialogContent>
        </Dialog>

        <ToolFormWrapper
          icon={icon}
          title={tool?.name || "Nigeria Tax Calculator"}
          description={tool?.description || "Calculate your personal income tax under Nigeria's tax laws"}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Annual / Monthly toggle */}
            <div className="bg-[#F5F5F5] rounded-xl p-1 flex">
              <button
                type="button"
                onClick={() => setMode("annual")}
                className={`flex-1 py-3 text-[14px] font-medium rounded-lg transition-all ${
                  mode === "annual"
                    ? "bg-white text-[#161A21] shadow-sm"
                    : "text-[#6A6D71] hover:text-[#161A21]"
                }`}
              >
                Annual
              </button>
              <button
                type="button"
                onClick={() => setMode("monthly")}
                className={`flex-1 py-3 text-[14px] font-medium rounded-lg transition-all ${
                  mode === "monthly"
                    ? "bg-white text-[#161A21] shadow-sm"
                    : "text-[#6A6D71] hover:text-[#161A21]"
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Info banner */}
            <div className="bg-[#FFEBEC] rounded-xl px-4 py-3 flex items-start gap-3">
              <Image src="/sparkling-line-2.svg" width={18} height={18} alt="info" className="mt-0.5 shrink-0 opacity-70" />
              <div>
                <p className="text-[13px] font-semibold text-[#7B79F9]">
                  Enter your amounts as {modeLabel(mode).toLowerCase()} values.
                </p>
                <p className="text-[12px] text-[#6A6D71] mt-0.5">
                  {mode === "annual"
                    ? "Calculations are annual. Monthly inputs are multiplied by 12."
                    : "You entered monthly amounts. We multiply by 12 to calculate annual PAYE, then show monthly averages."}
                </p>
              </div>
            </div>

            {/* Main fields */}
            <div className="space-y-5">
              <div className="space-y-2 text-left">
                <Label className="text-[#161A21] font-semibold text-[14px]">
                  Total {modeLabel(mode)} Income (Gross)
                </Label>
                <Input
                  type="number"
                  placeholder={`Enter your Total ${modeLabel(mode)} Income`}
                  value={grossIncome}
                  onChange={(e) => setGrossIncome(e.target.value)}
                  className="h-14 rounded-xl border-[#E8E8E8] bg-white"
                />
              </div>

              <div className="space-y-2 text-left">
                <Label className="text-[#161A21] font-semibold text-[14px]">
                  Pension Contribution ({modeLabel(mode)})
                </Label>
                <Input
                  type="number"
                  placeholder={`Enter your ${modeLabel(mode).toLowerCase()} Pension Contribution`}
                  value={pension}
                  onChange={(e) => setPension(e.target.value)}
                  className="h-14 rounded-xl border-[#E8E8E8] bg-white"
                />
              </div>

              <div className="space-y-2 text-left">
                <Label className="text-[#161A21] font-semibold text-[14px]">
                  National Housing Fund (NHF) ({modeLabel(mode)})
                </Label>
                <Input
                  type="number"
                  placeholder={`Enter your ${modeLabel(mode).toLowerCase()} National Housing Fund`}
                  value={nhf}
                  onChange={(e) => setNhf(e.target.value)}
                  className="h-14 rounded-xl border-[#E8E8E8] bg-white"
                />
              </div>

              <div className="space-y-2 text-left">
                <Label className="text-[#161A21] font-semibold text-[14px]">
                  Rent Paid ({modeLabel(mode)}) (for Rent Relief)
                </Label>
                <Input
                  type="number"
                  placeholder={`Enter your ${modeLabel(mode).toLowerCase()} Rent`}
                  value={rentPaid}
                  onChange={(e) => setRentPaid(e.target.value)}
                  className="h-14 rounded-xl border-[#E8E8E8] bg-white"
                />
              </div>
            </div>

            {/* Additional Deductions */}
            <div className="space-y-5">
              <h3 className="text-[16px] font-bold text-[#161A21]">Additional Deduction (Optional)</h3>

              <div className="space-y-2 text-left">
                <Label className="text-[#161A21] font-semibold text-[14px]">
                  NHIS Contributions ({modeLabel(mode)})
                </Label>
                <Input
                  type="number"
                  placeholder={`Enter your ${modeLabel(mode).toLowerCase()} NHIS Contributions`}
                  value={nhis}
                  onChange={(e) => setNhis(e.target.value)}
                  className="h-14 rounded-xl border-[#E8E8E8] bg-white"
                />
              </div>

              <div className="space-y-2 text-left">
                <Label className="text-[#161A21] font-semibold text-[14px]">
                  Life Insurance / Deferred Annuity ({modeLabel(mode)})
                </Label>
                <Input
                  type="number"
                  placeholder={`Enter your ${modeLabel(mode).toLowerCase()} Life Insurance`}
                  value={lifeInsurance}
                  onChange={(e) => setLifeInsurance(e.target.value)}
                  className="h-14 rounded-xl border-[#E8E8E8] bg-white"
                />
              </div>

              <div className="space-y-2 text-left">
                <Label className="text-[#161A21] font-semibold text-[14px]">
                  House Rent ({modeLabel(mode)})
                </Label>
                <Input
                  type="number"
                  placeholder={`Enter your ${modeLabel(mode).toLowerCase()} house rent`}
                  value={houseRent}
                  onChange={(e) => setHouseRent(e.target.value)}
                  className="h-14 rounded-xl border-[#E8E8E8] bg-white"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                disabled={generateMutation.isPending}
                className="gap-2 w-full sm:w-auto px-10 h-14 bg-[#322FEB] hover:bg-[#322FEB]/90 rounded-full shadow-[0px_8px_16px_0px_#322FEB4D] transition-all active:scale-95 text-[16px] justify-center"
              >
                {generateMutation.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Image src="/sparkling-line.svg" width={20} height={20} alt="gen" className="brightness-[10]" />
                )}
                {generateMutation.isPending
                  ? "Calculating..."
                  : <>
                      <span className="sm:hidden">Calculate ({tool?.generate_token_cost || 0} tokens)</span>
                      <span className="hidden sm:inline">Calculate my tax ({tool?.generate_token_cost || 0} tokens)</span>
                    </>
                }
              </Button>
            </div>
          </form>
        </ToolFormWrapper>
      </div>
    </div>
  );
}

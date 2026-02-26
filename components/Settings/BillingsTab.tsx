"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { MoreVertical, CheckCircle2, Clock } from "lucide-react";

const BillingsTab = () => {
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "invoices">("overview");

  const invoices = [
    { id: "1", description: "Invoice_Feb_089", date: "14 February", status: "UPCOMING", amount: "₦7500.00" },
    { id: "2", description: "Invoice_Jan_072", date: "14 January", status: "PAID", amount: "₦7500.00" },
    { id: "3", description: "Invoice_Dec_054", date: "14 December, 2025", status: "PAID", amount: "₦7500.00" },
    { id: "4", description: "Invoice_Oct_032", date: "14 October, 2025", status: "PAID", amount: "₦7500.00" },
    { id: "5", description: "Invoice_Sep_012", date: "14 September, 2025", status: "PAID", amount: "₦7500.00" },
  ];

  return (
    <div className="space-y-8">
      {/* Sub-tabs switcher */}
      <div className="inline-flex p-1 bg-[#F9F9FB] rounded-xl border border-[#F0F0F0]">
        <button
          onClick={() => setActiveSubTab("overview")}
          className={`px-8 py-2 text-[14px] font-medium rounded-lg transition-all ${
            activeSubTab === "overview" ? "bg-white shadow-sm text-[#161A21]" : "text-[#6A6D71] hover:text-[#161A21]"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveSubTab("invoices")}
          className={`px-8 py-2 text-[14px] font-medium rounded-lg transition-all ${
            activeSubTab === "invoices" ? "bg-white shadow-sm text-[#161A21]" : "text-[#6A6D71] hover:text-[#161A21]"
          }`}
        >
          Invoices
        </button>
      </div>

      {activeSubTab === "overview" ? (
        <div className="space-y-8">
          {/* Top Cards Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Standard Plan Card */}
            <div className="p-4 rounded-[16px] border border-[#E8E8E8] bg-white space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-[12px] text-[#95969A]">Current Plan</p>
                  <h3 className="mori-semibold text-[18px] text-[#161A21]">Standard Plan</h3>
                </div>
                <div className="text-right">
                  <div className="text-[24px] sora-semibold text-[#161A21]">₦7,500 <span className="text-[12px] font-normal text-[#6A6D71]">per month</span></div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#F0F0F0]">
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#6A6D71]">Next billing date</span>
                  <span className="text-[#161A21]">Feb 14, 2025</span>
                </div>
                <div className="flex justify-between items-center text-[14px]">
                  <span className="text-[#6A6D71] font-semibold">Amount Due</span>
                  <span className="text-[#161A21] text-[18px] font-bold">₦7,500</span>
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <Button variant="outline" className="flex-1 h-[48px] rounded-full border-[#E8E8E8] text-[#161A21] font-semibold text-[14px]">
                  Cancel plan
                </Button>
                <Button className="flex-1 h-[48px] rounded-full bg-[#322FEB] hover:bg-[#2826c8] text-white font-semibold text-[14px]">
                  Upgrade plan
                </Button>
              </div>
            </div>

            {/* Next Monthly Due Card */}
            <div className="p-4 rounded-[16px] border border-[#E8E8E8] bg-white space-y-6">
              <div className="">
                <h3 className="sora-semibold text-[24px] text-[#161A21]">₦7,500</h3>
                <p className="text-[12px] text-[#6A6D71]">Next monthly due on February 14</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#F0F0F0]">
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#6A6D71]">Current Charged Amount</span>
                  <span className="text-[#161A21] font-medium">₦7500</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#6A6D71]">Next Due Amount</span>
                  <span className="text-[#161A21] font-medium">₦7500</span>
                </div>
              </div>

              <Button variant="outline" className="w-full h-[52px] border-[#E8E8E8] text-[#161A21] font-semibold">
                View invoice
              </Button>
            </div>
          </div>

          {/* Bottom Cards Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Benefits List */}
            <div className="p-4 rounded-[16px] border border-[#E8E8E8] bg-white space-y-6">
              <h4 className="mori-semibold pb-3 border-b border-[#E8E8E8] text-[16px] text-[#161A21]">Current Plan Benefits</h4>
              <div className="space-y-4">
                {[
                  "Everything in FREE",
                  "10 premium applications",
                  "Try before committing",
                  "Access to workshops"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-[#161A21] text-[14px]">
                    <Image src="/check-fill.svg" alt="check" width={18} height={18} className="text-[#322FEB]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing & Card Details */}
            <div className="space-y-6">
              {/* Billing Info */}
              <div className="p-4 rounded-[16px] border border-[#E8E8E8] bg-white space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="mori-semibold text-[16px] pb-3 border-b border-[#E8E8E8] text-[#161A21]">Billing Details</h4>
                  <Button variant="outline" className="h-[32px] px-4 py-0 rounded-lg border-[#E8E8E8] text-[#161A21] text-[12px] font-medium">
                    Edit
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[#6A6D71]">Name</span>
                    <span className="text-[#161A21] font-medium text-right">Adeife Adeoye</span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[#6A6D71]">Email Address</span>
                    <span className="text-[#161A21] font-medium text-right">₦7500</span>
                  </div>
                </div>
              </div>

              {/* Card info */}
              <div className="p-3 rounded-[16px] border border-[#E8E8E8] bg-white space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="mori-semibold text-[16px] pb-3 border-b border-[#E8E8E8] text-[#161A21]">Card Details</h4>
                  <Button variant="outline" className="h-[32px] px-4 py-0  border-[#E8E8E8] text-[#161A21] text-[12px] font-medium">
                    Update
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F6F3FF] flex items-center justify-center border border-[#F0F0F0]">
                    <Image src="/gift-line-purple.svg" alt="card" width={24} height={24} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[14px] font-medium text-[#161A21]">**** **** **** 0000</p>
                    <p className="text-[12px] text-[#95969A]">Expiry Date: <span className="text-[#161A21] font-medium">12/27</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Invoices Table Section */
        <div className="bg-white overflow-hidden">
          <Table>
            <TableHeader className="bg-[#F9F9FB] rounded-[8px]">
              <TableRow className="border-b border-[#F0F0F0] rounded-[8px] h-[52px]">
                <TableHead className="w-[40px] px-6">
                  <div className="w-4 h-4 border-2 border-[#E8E8E8] rounded" />
                </TableHead>
                <TableHead className="text-[#6A6D71] text-[13px] font-medium px-6">Description</TableHead>
                <TableHead className="text-[#6A6D71] text-[13px] font-medium px-6">Due Date</TableHead>
                <TableHead className="text-[#6A6D71] text-[13px] font-medium px-6">Status</TableHead>
                <TableHead className="text-[#6A6D71] text-[13px] font-medium px-6 uppercase">Amount</TableHead>
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} className="border-b border-[#F0F0F0] h-[64px] hover:bg-gray-50/50">
                  <TableCell className="px-6">
                    <div className="w-4 h-4 border-2 border-[#E8E8E8] rounded" />
                  </TableCell>
                  <TableCell className="text-[#161A21] text-[14px] font-medium px-6">{invoice.description}</TableCell>
                  <TableCell className="text-[#161A21] text-[14px] px-6">{invoice.date}</TableCell>
                  <TableCell className="px-6">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${
                      invoice.status === 'PAID' 
                        ? 'bg-[#E7FDF0] text-[#00A854]' 
                        : 'bg-[#FFF4E5] text-[#F29339]'
                    }`}>
                      {invoice.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-[#161A21] text-[14px] font-semibold px-6">{invoice.amount}</TableCell>
                  <TableCell className="px-6 text-right">
                    <MoreVertical className="w-5 h-5 text-[#95969A] cursor-pointer" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default BillingsTab;

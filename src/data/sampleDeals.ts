
import { Deal } from "@/types/deals";

export const sampleDeals: Deal[] = [
  {
    id: "1",
    name: "Project Eland Windfarm",
    type: "Project Finance",
    amount: "€380M",
    lenders: 6,
    region: "UK",
    leadArranger: "NatWest",
    signedDate: "Mar 2025",
    maturityDate: "Sep 2040",
    status: "Active",
    flag: {
      type: "error",
      message: "KYC missing"
    }
  },
  {
    id: "2",
    name: "Apollo Energy Corp",
    type: "Term Loan B",
    amount: "€650M",
    lenders: 8,
    region: "US",
    leadArranger: "Barclays",
    signedDate: "Jan 2025",
    maturityDate: "Jan 2032",
    status: "Active"
  },
  {
    id: "3",
    name: "Beta Rail Infrastructure",
    type: "RCF + Term Loan",
    amount: "€900M",
    lenders: 12,
    region: "ES",
    leadArranger: "Santander",
    signedDate: "Feb 2025",
    maturityDate: "Feb 2035",
    status: "Active",
    flag: {
      type: "warning",
      message: "Document action required"
    }
  },
  {
    id: "4",
    name: "GammaTech Series C Facility",
    type: "Convertible Loan",
    amount: "€120M",
    lenders: 4,
    region: "ES",
    leadArranger: "BBVA",
    signedDate: "Oct 2024",
    maturityDate: "Oct 2027",
    status: "Closed"
  },
  {
    id: "5",
    name: "Borealis Equity Partners",
    type: "Leveraged Loan",
    amount: "€440M",
    lenders: 9,
    region: "DE",
    leadArranger: "Deutsche Bank",
    signedDate: "Dec 2024",
    maturityDate: "Dec 2031",
    status: "Monitoring",
    flag: {
      type: "error",
      message: "Covenant breach"
    }
  },
  {
    id: "6",
    name: "Outer Banks Real Estate",
    type: "Syndicated Mortgage",
    amount: "€210M",
    lenders: 5,
    region: "FR",
    leadArranger: "BNP Paribas",
    signedDate: "Apr 2025",
    maturityDate: "Apr 2035",
    status: "Active"
  },
  {
    id: "7",
    name: "Novaflux Green Transition Fund",
    type: "Bridge Loan",
    amount: "€300M",
    lenders: 7,
    region: "NL",
    leadArranger: "ING",
    signedDate: "Pending",
    maturityDate: "Expected Jun 2026",
    status: "Pending Review",
    flag: {
      type: "info",
      message: "Pending rollover"
    }
  },
  {
    id: "8",
    name: "VivaZinc Metals Trade",
    type: "Asset-Backed Revolver",
    amount: "€110M",
    lenders: 3,
    region: "PT",
    leadArranger: "Millennium BCP",
    signedDate: "Mar 2025",
    maturityDate: "Mar 2028",
    status: "Active"
  },
  {
    id: "9",
    name: "Verona Airport Upgrade",
    type: "Public-Private Finance",
    amount: "€530M",
    lenders: 6,
    region: "IT",
    leadArranger: "UniCredit",
    signedDate: "Expected Jul 2025",
    maturityDate: "Expected Jul 2045",
    status: "Pending Review"
  },
  {
    id: "10",
    name: "LibraTel Telecom Group",
    type: "Cross-Border LBO Loan",
    amount: "€870M",
    lenders: 10,
    region: "US/ES",
    leadArranger: "J.P. Morgan",
    signedDate: "Jan 2025",
    maturityDate: "Jan 2032",
    status: "Active"
  },
  {
    id: "11",
    name: "Delta Biotech Licensing Loan",
    type: "IP-Backed Loan",
    amount: "€150M",
    lenders: 6,
    region: "UK",
    leadArranger: "HSBC",
    signedDate: "Feb 2025",
    maturityDate: "Feb 2030",
    status: "Active"
  },
  {
    id: "12",
    name: "Zeta Shipping Group",
    type: "Shipping Loan",
    amount: "€320M",
    lenders: 4,
    region: "CY/GR",
    leadArranger: "Piraeus Bank",
    signedDate: "Dec 2024",
    maturityDate: "Dec 2034",
    status: "Monitoring"
  }
];

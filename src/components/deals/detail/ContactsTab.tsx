
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Mail, Phone, Video, AlertTriangle, Check, AlertCircle, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Enhanced mock data for contacts with more detailed information
const mockContacts = [
  {
    id: "contact-1",
    name: "Sara Johnson",
    role: "Relationship Manager",
    company: "First National Bank",
    email: "sjohnson@fnb.example",
    phone: "+1 (555) 123-4567",
    type: "lender",
    kycStatus: "approved",
    isPrimary: false,
    organization: "Agent Bank"
  },
  {
    id: "contact-2",
    name: "Michael Chen",
    role: "CFO",
    company: "Alpha Corporation",
    email: "mchen@alphacorp.example",
    phone: "+1 (555) 987-6543",
    type: "borrower",
    kycStatus: "approved",
    isPrimary: true,
    organization: "Borrower"
  },
  {
    id: "contact-3",
    name: "Olivia Williams",
    role: "Legal Counsel",
    company: "Global Legal Partners",
    email: "owilliams@glp.example",
    phone: "+1 (555) 333-2222",
    type: "legal",
    kycStatus: "pending",
    isPrimary: true,
    organization: "Legal Counsel"
  },
  {
    id: "contact-4",
    name: "David Kim",
    role: "Credit Officer",
    company: "First National Bank",
    email: "dkim@fnb.example",
    phone: "+1 (555) 444-5555",
    type: "lender",
    kycStatus: "approved",
    isPrimary: false,
    organization: "Agent Bank"
  },
  {
    id: "contact-5",
    name: "Sophia Martinez",
    role: "Treasurer",
    company: "Alpha Corporation",
    email: "smartinez@alphacorp.example",
    phone: "+1 (555) 111-2222",
    type: "borrower",
    kycStatus: "flagged",
    isPrimary: false,
    organization: "Borrower"
  },
  {
    id: "contact-6",
    name: "James Wilson",
    role: "Syndication Manager",
    company: "Capital Partners",
    email: "jwilson@cp.example",
    phone: "+1 (555) 777-8888",
    type: "lender",
    kycStatus: "pending",
    isPrimary: true,
    organization: "Delta Bank"
  },
  {
    id: "contact-7",
    name: "Alice Wong",
    role: "Investment Officer",
    company: "Delta Bank",
    email: "awong@deltabank.example",
    phone: "+1 (646) 000-0001",
    type: "lender",
    kycStatus: "approved",
    isPrimary: true,
    organization: "Delta Bank"
  },
  {
    id: "contact-8",
    name: "Bob Lee",
    role: "Senior Manager",
    company: "Gamma Credit Corp",
    email: "bob.lee@gammacredit.example",
    phone: "+1 (555) 222-3333",
    type: "lender",
    kycStatus: "approved",
    isPrimary: true,
    organization: "Gamma Credit Corp"
  },
  {
    id: "contact-9",
    name: "Carol Smith",
    role: "Vice President",
    company: "EFG Bank",
    email: "carol.smith@efg.example",
    phone: "+1 (555) 444-5555",
    type: "lender",
    kycStatus: "approved",
    isPrimary: true,
    organization: "EFG Bank"
  },
  {
    id: "contact-10",
    name: "Daniel Wu",
    role: "Relationship Manager",
    company: "HK Finance",
    email: "dwu@hkfinance.hk",
    phone: "+852 2111 2222",
    type: "lender",
    kycStatus: "pending",
    isPrimary: true,
    organization: "HK Finance"
  },
  {
    id: "contact-11",
    name: "Emma Kumar",
    role: "Director",
    company: "Zeta Investments",
    email: "ekumar@zetainvest.example",
    phone: "+1 (555) 666-7777",
    type: "lender",
    kycStatus: "flagged",
    isPrimary: true,
    organization: "Zeta Investments"
  },
  {
    id: "contact-12",
    name: "Jane Smith",
    role: "Treasurer",
    company: "Alpha Corporation",
    email: "jsmith@alphacorp.example",
    phone: "+1 (555) 888-9999",
    type: "borrower",
    kycStatus: "approved",
    isPrimary: false,
    organization: "Borrower"
  },
  {
    id: "contact-13",
    name: "Marina Gomez",
    role: "Deal Manager",
    company: "YourBank",
    email: "mgomez@yourbank.example",
    phone: "+44 20 1111 2222",
    type: "lender",
    kycStatus: "approved",
    isPrimary: true,
    organization: "Agent Bank"
  },
  {
    id: "contact-14",
    name: "Alex Chen",
    role: "Operations",
    company: "YourBank",
    email: "achen@yourbank.example",
    phone: "+44 20 1111 3333",
    type: "lender",
    kycStatus: "approved",
    isPrimary: false,
    organization: "Agent Bank"
  },
  {
    id: "contact-15",
    name: "Michael Brown",
    role: "Outside Counsel",
    company: "LawFirm LLP",
    email: "mbrown@lawfirm.example",
    phone: "+1 212 555 1234",
    type: "legal",
    kycStatus: "approved",
    isPrimary: true,
    organization: "Legal Counsel"
  }
];

const ContactsTab = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [organizationFilter, setOrganizationFilter] = useState("all");
  
  // Get unique organizations for the filter dropdown
  const organizations = ["all", ...new Set(mockContacts.map(contact => contact.organization))];
  
  // Filter contacts based on active tab, search query, and organization filter
  const filteredContacts = mockContacts.filter(contact => {
    const matchesTab = activeTab === "all" || contact.type === activeTab;
    const matchesOrg = organizationFilter === "all" || contact.organization === organizationFilter;
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.organization.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch && matchesOrg;
  });

  // Group contacts by organization
  const groupedContacts = filteredContacts.reduce((groups, contact) => {
    const group = groups[contact.organization] || [];
    group.push(contact);
    groups[contact.organization] = group;
    return groups;
  }, {} as Record<string, typeof mockContacts>);
  
  const getKycStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <Check className="h-4 w-4 text-green-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "flagged":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getKycStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "KYC Approved";
      case "pending":
        return "KYC Pending";
      case "flagged":
        return "KYC Issue";
      default:
        return "";
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">Deal Contacts</h2>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Contact
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <Tabs 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid grid-cols-4 w-full sm:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="borrower">Borrower</TabsTrigger>
            <TabsTrigger value="lender">Lenders</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2 items-center">
          <div className="relative max-w-xs">
            <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={organizationFilter} onValueChange={setOrganizationFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by Organization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Organizations</SelectItem>
              {organizations.filter(org => org !== "all").map(org => (
                <SelectItem key={org} value={org}>{org}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Render contacts grouped by organization */}
      <div className="space-y-6">
        {Object.entries(groupedContacts).map(([organization, contacts]) => (
          <div key={organization} className="space-y-3">
            <h3 className="text-md font-semibold border-b pb-1">{organization}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contacts.map((contact) => (
                <Card key={contact.id} className={contact.isPrimary ? "border-l-4 border-l-primary" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg" alt={contact.name} />
                        <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{contact.name}</h3>
                              {contact.isPrimary && (
                                <Badge variant="outline" className="text-xs py-0 px-1 h-5">Primary</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {contact.role}, {contact.company}
                            </p>
                          </div>
                          <Badge variant="outline" className="capitalize h-[22px]">
                            {contact.type}
                          </Badge>
                        </div>
                        
                        <div className="mt-3 flex text-sm text-muted-foreground">
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                              <Mail className="h-3.5 w-3.5" />
                              <a href={`mailto:${contact.email}`} className="text-xs hover:underline">{contact.email}</a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-3.5 w-3.5" />
                              <span className="text-xs">{contact.phone}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {getKycStatusIcon(contact.kycStatus)}
                            <span className={`text-xs ${
                              contact.kycStatus === 'approved' ? 'text-green-500' : 
                              contact.kycStatus === 'pending' ? 'text-yellow-500' : 
                              'text-red-500'
                            }`}>
                              {getKycStatusText(contact.kycStatus)}
                            </span>
                          </div>
                          
                          <div className="flex gap-1">
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-7 w-7" 
                              title={`Email ${contact.name}`}
                              onClick={() => window.location.href = `mailto:${contact.email}`}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-7 w-7" 
                              title={`Call ${contact.name}`}
                            >
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              className="h-7 w-7" 
                              title={`Video call with ${contact.name}`}
                            >
                              <Video className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {Object.keys(groupedContacts).length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            No contacts found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsTab;

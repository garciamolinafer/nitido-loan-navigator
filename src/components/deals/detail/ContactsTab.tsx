
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Mail, Phone, Video, AlertTriangle, Check, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for contacts
const mockContacts = [
  {
    id: "contact-1",
    name: "Sara Johnson",
    role: "Relationship Manager",
    company: "First National Bank",
    email: "sjohnson@fnb.example",
    phone: "+1 (555) 123-4567",
    type: "lender",
    kycStatus: "approved"
  },
  {
    id: "contact-2",
    name: "Michael Chen",
    role: "CFO",
    company: "Alpha Corporation",
    email: "mchen@alphacorp.example",
    phone: "+1 (555) 987-6543",
    type: "borrower",
    kycStatus: "approved"
  },
  {
    id: "contact-3",
    name: "Olivia Williams",
    role: "Legal Counsel",
    company: "Global Legal Partners",
    email: "owilliams@glp.example",
    phone: "+1 (555) 333-2222",
    type: "legal",
    kycStatus: "pending"
  },
  {
    id: "contact-4",
    name: "David Kim",
    role: "Credit Officer",
    company: "First National Bank",
    email: "dkim@fnb.example",
    phone: "+1 (555) 444-5555",
    type: "lender",
    kycStatus: "approved"
  },
  {
    id: "contact-5",
    name: "Sophia Martinez",
    role: "Treasurer",
    company: "Alpha Corporation",
    email: "smartinez@alphacorp.example",
    phone: "+1 (555) 111-2222",
    type: "borrower",
    kycStatus: "flagged"
  },
  {
    id: "contact-6",
    name: "James Wilson",
    role: "Syndication Manager",
    company: "Capital Partners",
    email: "jwilson@cp.example",
    phone: "+1 (555) 777-8888",
    type: "lender",
    kycStatus: "pending"
  }
];

const ContactsTab = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter contacts based on active tab and search query
  const filteredContacts = mockContacts.filter(contact => {
    const matchesTab = activeTab === "all" || contact.type === activeTab;
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
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
        
        <div className="relative max-w-xs">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      
      <TabsContent value="all" className="m-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" alt={contact.name} />
                    <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {contact.role}, {contact.company}
                        </p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {contact.type}
                      </Badge>
                    </div>
                    
                    <div className="mt-3 flex text-sm text-muted-foreground">
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <Mail className="h-3.5 w-3.5" />
                          <span className="text-xs">{contact.email}</span>
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
                        <Button size="icon" variant="ghost" className="h-7 w-7">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7">
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
      </TabsContent>
      <TabsContent value="borrower" className="m-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <CardContent className="p-4">
                {/* Same card content as above */}
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {contact.role}, {contact.company}
                        </p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {contact.type}
                      </Badge>
                    </div>
                    
                    <div className="mt-3 flex text-sm text-muted-foreground">
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <Mail className="h-3.5 w-3.5" />
                          <span className="text-xs">{contact.email}</span>
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
                        <Button size="icon" variant="ghost" className="h-7 w-7">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-7 w-7">
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
      </TabsContent>
      <TabsContent value="lender" className="m-0">
        {/* Same structure as "all" tab */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts
            .filter(contact => contact.type === "lender")
            .map((contact) => (
              <Card key={contact.id}>
                <CardContent className="p-4">
                  {/* Same card content structure */}
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {contact.role}, {contact.company}
                          </p>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {contact.type}
                        </Badge>
                      </div>
                      
                      <div className="mt-3 flex text-sm text-muted-foreground">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <Mail className="h-3.5 w-3.5" />
                            <span className="text-xs">{contact.email}</span>
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
                          <Button size="icon" variant="ghost" className="h-7 w-7">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7">
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
      </TabsContent>
      <TabsContent value="legal" className="m-0">
        {/* Same structure as "all" tab */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts
            .filter(contact => contact.type === "legal")
            .map((contact) => (
              <Card key={contact.id}>
                <CardContent className="p-4">
                  {/* Same card content structure */}
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{contact.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {contact.role}, {contact.company}
                          </p>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {contact.type}
                        </Badge>
                      </div>
                      
                      <div className="mt-3 flex text-sm text-muted-foreground">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <Mail className="h-3.5 w-3.5" />
                            <span className="text-xs">{contact.email}</span>
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
                          <Button size="icon" variant="ghost" className="h-7 w-7">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7">
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
      </TabsContent>
    </div>
  );
};

export default ContactsTab;

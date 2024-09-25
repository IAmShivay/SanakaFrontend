
import React, { useEffect, useMemo } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { leadsGets } from "../../app/leads/leadSlice";
import { RootState } from "../../store";
import { AppDispatch } from "../../store";

interface Lead {
  name: string;
  phoneNumber: string;
  createdAt: string;
  course: string;
  place: string;
  college: string;
}

interface GroupedLeads {
  today: Lead[];
  yesterday: Lead[];
  pastWeek: Lead[];
  older: Lead[];
}

const Leads: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, leads, error } = useSelector((state: RootState) => state.leads);

  useEffect(() => {
    dispatch(leadsGets());
  }, [dispatch]);

  const groupedLeads: GroupedLeads = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return leads.reduce((acc: any, lead: any) => {
      const leadDate = new Date(lead.createdAt);
      leadDate.setHours(0, 0, 0, 0);

      if (leadDate.getTime() === today.getTime()) {
        acc.today.push(lead);
      } else if (leadDate.getTime() === yesterday.getTime()) {
        acc.yesterday.push(lead);
      } else if (leadDate >= sevenDaysAgo && leadDate < yesterday) {
        acc.pastWeek.push(lead);
      } else {
        acc.older.push(lead);
      }
      return acc;
    }, { today: [], yesterday: [], pastWeek: [], older: [] });
  }, [leads]);

  const LeadTable: React.FC<{ leads: Lead[], title: string }> = ({ leads, title }) => (
    <>
      <Typography variant="h6" style={{ marginTop: '20px', marginBottom: '10px' }}>{title}</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Place</TableCell>
              <TableCell>College</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((lead, index) => (
              <TableRow key={index}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.phoneNumber}</TableCell>
                <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{lead.course}</TableCell>
                <TableCell>{lead.place}</TableCell>
                <TableCell>{lead.college}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  return (
    <div style={{ paddingTop: "10vh" }}>
      <Typography variant="h4" gutterBottom>Leads</Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          {groupedLeads.today.length > 0 && <LeadTable leads={groupedLeads.today} title="Today's Leads" />}
          {groupedLeads.yesterday.length > 0 && <LeadTable leads={groupedLeads.yesterday} title="Yesterday's Leads" />}
          {groupedLeads.pastWeek.length > 0 && <LeadTable leads={groupedLeads.pastWeek} title="Past 7 Days' Leads" />}
          {groupedLeads.older.length > 0 && <LeadTable leads={groupedLeads.older} title="Older Leads" />}
        </>
      )}
    </div>
  );
};

export default Leads;
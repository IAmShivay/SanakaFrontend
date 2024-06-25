// import React from 'react';
// import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// // import { LeadsGet } from '../../api/leadApi';
// interface Lead {
//   name: string;
//   phone: string;
//   place: string;
// }

// const leads: Lead[] = [
//   { name: 'John Doe', phone: '555-1234', place: 'New York' },
//   { name: 'Jane Smith', phone: '555-5678', place: 'Los Angeles' },
//   { name: 'Alice Johnson', phone: '555-8765', place: 'Chicago' },
// ];

// const Leads: React.FC = () => {
//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Leads
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell>Phone Number</TableCell>
//               <TableCell>Place</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {leads.map((lead, index) => (
//               <TableRow key={index}>
//                 <TableCell>{lead.name}</TableCell>
//                 <TableCell>{lead.phone}</TableCell>
//                 <TableCell>{lead.place}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default Leads;
import React, { useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useDispatch } from 'react-redux'; // Assuming you are using Redux
import { leadsGets } from '../../app/leadSlice';

interface Lead {
  name: string;
  phone: string;
  place: string;
}

const leads: Lead[] = [
  { name: 'John Doe', phone: '555-1234', place: 'New York' },
  { name: 'Jane Smith', phone: '555-5678', place: 'Los Angeles' },
  { name: 'Alice Johnson', phone: '555-8765', place: 'Chicago' },
];

const Leads: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Component rendered'); // Log when component renders
    dispatch(leadsGets());
    console.log('Dispatched action: leadsGets'); // Log when action is dispatched
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Leads
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Place</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads.map((lead, index) => (
              <TableRow key={index}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>{lead.place}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Leads;


import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, AlertCircle, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';
import type { Leave } from '@/types';

// Sample data for leave requests
const leaveRequests: Leave[] = [
  {
    id: '1',
    employeeId: 'emp001',
    startDate: '2023-11-15',
    endDate: '2023-11-20',
    reason: 'Annual vacation with family',
    status: 'pending',
    type: 'annual',
  },
  {
    id: '2',
    employeeId: 'emp005',
    startDate: '2023-11-10',
    endDate: '2023-11-12',
    reason: 'Medical appointment',
    status: 'pending',
    type: 'sick',
  },
  {
    id: '3',
    employeeId: 'emp008',
    startDate: '2023-12-01',
    endDate: '2023-12-15',
    reason: 'Visiting family abroad',
    status: 'pending',
    type: 'annual',
  },
];

// Mock employee data
const employeeNames: Record<string, string> = {
  emp001: 'Ahmed Khalid',
  emp005: 'Sara Mansouri',
  emp008: 'Karim El Ouazzani',
};

const LeavesApproval: React.FC = () => {
  const { t } = useLanguage();
  const [requests, setRequests] = useState<Leave[]>(leaveRequests);
  const [selectedRequest, setSelectedRequest] = useState<Leave | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [action, setAction] = useState<'approve' | 'reject' | null>(null);

  const handleStatusChange = (id: string, newStatus: 'approved' | 'rejected') => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
    
    toast({
      title: newStatus === 'approved' 
        ? t('leaves.leaveApproved') 
        : t('leaves.leaveRejected'),
      description: `${t('leaves.leaveRequestFor')} ${employeeNames[selectedRequest?.employeeId || '']} ${newStatus === 'approved' 
        ? t('leaves.hasBeenApproved') 
        : t('leaves.hasBeenRejected')}`,
    });
    
    setDialogOpen(false);
    setComment('');
    setAction(null);
  };

  const openApprovalDialog = (request: Leave, actionType: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setAction(actionType);
    setDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">{t('leaves.approved')}</Badge>;
      case 'rejected':
        return <Badge variant="destructive">{t('leaves.rejected')}</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-amber-500 text-amber-500">{t('leaves.pending')}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{t('leaves.pendingApprovals')}</CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('common.employee')}</TableHead>
                  <TableHead>{t('leaves.type')}</TableHead>
                  <TableHead>{t('leaves.period')}</TableHead>
                  <TableHead>{t('common.status')}</TableHead>
                  <TableHead>{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {employeeNames[request.employeeId] || request.employeeId}
                      </div>
                    </TableCell>
                    <TableCell>
                      {t(`leaves.${request.type}`)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {format(new Date(request.startDate), 'MMM d, yyyy')} - {format(new Date(request.endDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(request.status)}
                    </TableCell>
                    <TableCell>
                      {request.status === 'pending' && (
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => openApprovalDialog(request, 'approve')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            {t('common.approve')}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => openApprovalDialog(request, 'reject')}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            {t('common.reject')}
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center p-6">
              <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-lg font-medium">{t('leaves.noRequests')}</p>
              <p className="text-sm text-muted-foreground">{t('leaves.noRequestsDescription')}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === 'approve' 
                ? t('leaves.approveRequest') 
                : t('leaves.rejectRequest')}
            </DialogTitle>
            <DialogDescription>
              {action === 'approve'
                ? t('leaves.approveRequestDescription')
                : t('leaves.rejectRequestDescription')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">{t('common.employee')}:</div>
                <div>{employeeNames[selectedRequest.employeeId] || selectedRequest.employeeId}</div>
                
                <div className="font-medium">{t('leaves.type')}:</div>
                <div>{t(`leaves.${selectedRequest.type}`)}</div>
                
                <div className="font-medium">{t('leaves.period')}:</div>
                <div>
                  {format(new Date(selectedRequest.startDate), 'MMM d, yyyy')} - {format(new Date(selectedRequest.endDate), 'MMM d, yyyy')}
                </div>
                
                <div className="font-medium">{t('leaves.reason')}:</div>
                <div>{selectedRequest.reason}</div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="comment" className="text-sm font-medium">
                  {t('common.comment')}
                </label>
                <Textarea
                  id="comment"
                  placeholder={t('leaves.commentPlaceholder')}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              variant={action === 'approve' ? 'default' : 'destructive'}
              onClick={() => selectedRequest && handleStatusChange(selectedRequest.id, action === 'approve' ? 'approved' : 'rejected')}
            >
              {action === 'approve' ? t('common.approve') : t('common.reject')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LeavesApproval;

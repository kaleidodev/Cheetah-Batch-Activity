
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function CreateBatchActivity() {
  const [activityType, setActivityType] = useState('Earn Adjustment');
  const [adjustmentType, setAdjustmentType] = useState('Add');
  const [metricType, setMetricType] = useState('Base Miles');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [location, setLocation] = useState('');
  const [activityDateTime, setActivityDateTime] = useState('2023-05-08 22:32');
  const [timeZone, setTimeZone] = useState('GMT+00:00 Etc/UTC (UTC)');
  const [isConfigureExpanded, setIsConfigureExpanded] = useState(true);
  const [isAudienceExpanded, setIsAudienceExpanded] = useState(false);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  const [tierScheme, setTierScheme] = useState('Default');
  const [transactionType, setTransactionType] = useState('Upgrade');
  const [currentLevel, setCurrentLevel] = useState('Base');
  const [newLevel, setNewLevel] = useState('Silver');
  const [startDate, setStartDate] = useState('2023-05-08 22:32');
  const [endDate, setEndDate] = useState('2023-05-08 22:32');

  const [attribute, setAttribute] = useState('');
  const [value, setValue] = useState('');

  const [segmentSearchValue, setSegmentSearchValue] = useState('');
  const [isSegmentDropdownOpen, setIsSegmentDropdownOpen] = useState(false);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [tempSelectedSegments, setTempSelectedSegments] = useState<string[]>([]);

  const [selectedSegmentData, setSelectedSegmentData] = useState<any[]>([]);

  const allSegments = [
    { id: 'segment_01', name: 'Premium Members', description: 'High-tier premium members', status: 'Published' },
    { id: 'segment_02', name: 'New Members', description: 'Recently joined members', status: 'Draft' },
    { id: 'segment_03', name: 'Active Members', description: 'Regularly active members', status: 'Published' },
    { id: 'segment_04', name: 'Inactive Members', description: 'Members with low activity', status: 'Draft' },
    { id: 'segment_05', name: 'VIP Members', description: 'VIP tier members', status: 'Published' },
    { id: 'segment_06', name: 'Gold Members', description: 'Gold tier members', status: 'Published' },
  ];

  const filteredSegments = allSegments.filter(segment =>
    segment.name.toLowerCase().includes(segmentSearchValue.toLowerCase()) ||
    segment.description.toLowerCase().includes(segmentSearchValue.toLowerCase()) ||
    segment.status.toLowerCase().includes(segmentSearchValue.toLowerCase())
  );

  const segmentDropdownRef = useRef<HTMLDivElement>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('NOT EXECUTED');
  const [submissionProgress, setSubmissionProgress] = useState(0);
  const [submissionStatusLabel, setSubmissionStatusLabel] = useState('Not started (0 of 0)');
  const [historyRecords, setHistoryRecords] = useState<any[]>([]);
  const [processedMembers, setProcessedMembers] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showMethodChangeModal, setShowMethodChangeModal] = useState(false);
  const [pendingMethodChange, setPendingMethodChange] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('segments');
  const [showBackWarningModal, setShowBackWarningModal] = useState(false);

  const [uploadedFiles, setUploadedFiles] = useState<{ id: string; name: string; members: number }>([]);
  const [selectedFileName, setSelectedFileName] = useState('No file chosen');

  const [showCriteriaBuilder, setShowCriteriaBuilder] = useState(false);
  const [ruleGroups, setRuleGroups] = useState([
    {
      id: 1,
      operator: 'All',
      rules: [
        {
          id: 1,
          attribute: 'Attributes',
          condition: 'equal',
          value: '',
        },
      ],
      nestedGroups: [],
    },
  ]);

  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const templateCategories = [
    {
      title: 'High Value Customers',
      description: 'Customers with high lifetime value and frequent purchases',
      rulePreview: 'Purchase_Amount > 500 AND Purchase_Frequency > 5 per month',
      icon: 'ri-star-line',
    },
    {
      title: 'Dormant Customers',
      description: "Customers who haven't purchased in the last 90 days",
      rulePreview: 'Last_Purchase_Date < 90 days ago',
      icon: 'ri-time-line',
    },
    {
      title: 'New Subscribers',
      description: 'Recently registered customers in the last 30 days',
      rulePreview: 'Registration_Date > 30 days ago AND Email_Subscribed = true',
      icon: 'ri-user-add-line',
    },
    {
      title: 'Mobile App Users',
      description: 'Customers who primarily use mobile app',
      rulePreview: 'App_Usage > 10 sessions AND Mobile_Orders > 0',
      icon: 'ri-smartphone-line',
    },
    {
      title: 'Loyalty Program Members',
      description: 'Active loyalty program participants',
      rulePreview: 'Loyalty_Status = Active AND Points_Balance > 100',
      icon: 'ri-vip-crown-line',
    },
    {
      title: 'Geographic Segment',
      description: 'Customers from specific regions',
      rulePreview: 'Location = New York OR Location = California',
      icon: 'ri-map-pin-line',
    },
  ];

  const handleStartFromTemplate = () => {
    setShowTemplateModal(true);
  };

  const handleSelectTemplate = (template: any) => {
    setShowCriteriaBuilder(true);
    setShowTemplateModal(false);
    const templateRuleGroup = {
      id: Date.now(),
      operator: 'All',
      rules: [
        {
          id: Date.now(),
          attribute: 'Attributes',
          condition: 'equal',
          value: template.title,
        },
      ],
      nestedGroups: [],
    };
    setRuleGroups([templateRuleGroup]);
  };

  const handleBackFromTemplate = () => {
    if (ruleGroups.length > 1 || ruleGroups[0].rules.some(rule => rule.value !== '')) {
      setShowBackWarningModal(true);
    } else {
      setShowTemplateModal(false);
      setShowCriteriaBuilder(false);
    }
  };

  const handleConfirmBack = () => {
    setShowBackWarningModal(false);
    setShowTemplateModal(false);
    setShowCriteriaBuilder(false);
    setRuleGroups([
      {
        id: 1,
        operator: 'All',
        rules: [
          {
            id: 1,
            attribute: 'Attributes',
            condition: 'equal',
            value: '',
          },
        ],
        nestedGroups: [],
      },
    ]);
  };

  const handleCancelBack = () => {
    setShowBackWarningModal(false);
  };

  const handleSegmentToggle = (segmentId: string) => {
    setTempSelectedSegments(prev =>
      prev.includes(segmentId)
        ? prev.filter(id => id !== segmentId)
        : [...prev, segmentId]
    );
  };

  const handleSelectAll = () => {
    setTempSelectedSegments(filteredSegments.map(segment => segment.id));
  };

  const handleClearAll = () => {
    setTempSelectedSegments([]);
  };

  const handleApplySegments = () => {
    const selectedData = allSegments.filter(segment =>
      tempSelectedSegments.includes(segment.id)
    ).map(segment => ({ ...segment, publishedDate: 'March 4, 2025', effectivity: 'Jan 1, 2025 - Dec 31, 2025', members: Math.floor(Math.random() * 5000) + 1000 }));

    setSelectedSegmentData(selectedData);
    setSelectedSegments([...tempSelectedSegments]);
    setIsSegmentDropdownOpen(false);
  };

  const handleDeleteSegment = (segmentId: string) => {
    setSelectedSegmentData(prev => prev.filter(segment => segment.id !== segmentId));
  };

  const handleActivityTypeChange = (value: string) => {
    setActivityType(value);
    setAdjustmentType('Add');
    setMetricType('Base Miles');
    setTierScheme('Default');
    setTransactionType('Upgrade');
    setCurrentLevel('Base');
    setNewLevel('Silver');
    setAttribute('');
    setValue('');
  };

  const renderActivityTypeFields = () => {
    if (activityType === 'Update Member Attribute') {
      return (
        <div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={activityType}
                onChange={e => handleActivityTypeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600 bg-white pr-8 appearance-none"
                style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
              >
                <option>Earn Adjustment</option>
                <option>Tier Adjustment</option>
                <option>Update Member Attribute</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attribute <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={attribute}
                onChange={e => setAttribute(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600 bg-white pr-8 appearance-none"
                style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
              >
                <option value="">Select Attribute</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="name">Name</option>
                <option value="address">Address</option>
                <option value="birthdate">Birth Date</option>
                <option value="preference">Preference</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Value <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Value"
              value={value}
              onChange={e => setValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600"
              style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
            />
          </div>
        </div>
      );
    } else if (activityType === 'Tier Adjustment') {
      return (
        <div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={activityType}
                onChange={e => handleActivityTypeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600 bg-white pr-8 appearance-none"
                style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
              >
                <option>Earn Adjustment</option>
                <option>Tier Adjustment</option>
                <option>Update Member Attribute</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tier Scheme <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={tierScheme}
                onChange={e => setTierScheme(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600 bg-white pr-8 appearance-none"
                style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
              >
                <option>Default</option>
                <option>Premium</option>
                <option>Elite</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={transactionType}
                onChange={e => setTransactionType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600 bg-white pr-8 appearance-none"
                style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
              >
                <option>Upgrade</option>
                <option>Downgrade</option>
                <option>Maintain</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Level <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={currentLevel}
                onChange={e => setCurrentLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600 bg-white pr-8 appearance-none"
                style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
              >
                <option>Base</option>
                <option>Silver</option>
                <option>Gold</option>
                <option>Platinum</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Level <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={newLevel}
                onChange={e => setNewLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600 bg-white pr-8 appearance-none"
                style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
              >
                <option>Base</option>
                <option>Silver</option>
                <option>Gold</option>
                <option>Platinum</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600"
              style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600"
              style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={activityType}
                onChange={e => handleActivityTypeChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600 bg-white pr-8 appearance-none"
                style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
              >
                <option>Earn Adjustment</option>
                <option>Tier Adjustment</option>
                <option>Update Member Attribute</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adjustment Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={adjustmentType}
                onChange={e => setAdjustmentType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600 bg-white pr-8 appearance-none"
                style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
              >
                <option>Add</option>
                <option>Deduct</option>
                <option>Set</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Metric Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={metricType}
                onChange={e => setMetricType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600 bg-white pr-8 appearance-none"
                style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
              >
                <option>Base Miles</option>
                <option>Bonus Miles</option>
                <option>Elite Miles</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <i className="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600"
              style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
            />
          </div>
        </div>
      );
    }
  };

  const handleSectionToggle = (section: 'configure' | 'audience' | 'history') => {
    setIsConfigureExpanded(section === 'configure');
    setIsAudienceExpanded(section === 'audience');
    setIsHistoryExpanded(section === 'history');
  };

  const handleCreateNewCriteria = () => {
    setShowCriteriaBuilder(true);
  };

  const handleMethodChange = (method: string) => {
    if (selectedMethod !== method && selectedSegmentData.length > 0) {
      setPendingMethodChange(method);
      setShowMethodChangeModal(true);
    } else {
      setSelectedMethod(method);
    }
  };

  const handleConfirmMethodChange = () => {
    setSelectedMethod(pendingMethodChange);
    setSelectedSegmentData([]);
    setSelectedSegments([]);
    setTempSelectedSegments([]);
    setUploadedFiles([]);
    setSelectedFileName('No file chosen');
    setShowMethodChangeModal(false);
  };

  const handleCancelMethodChange = () => {
    setShowMethodChangeModal(false);
    setPendingMethodChange('');
  };

  const handleFileUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setSelectedFileName(file.name);
        const newFile = {
          id: `file_${Date.now()}`,
          name: file.name,
          members: Math.floor(Math.random() * 50000) + 1000,
        };
        setUploadedFiles(prev => [...prev, newFile]);
      }
    };
    fileInput.click();
  };

  const handleDeleteFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleSubmitClick = () => {
    if (selectedMethod === 'segments' && selectedSegmentData.length === 0) {
      alert('Please select audience segments first');
      return;
    }
    if (selectedMethod === 'fileUpload' && uploadedFiles.length === 0) {
      alert('Please upload a file first');
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);

    let total = 0;
    if (selectedMethod === 'segments') {
      total = selectedSegmentData.reduce((sum, segment) => sum + segment.members, 0);
    } else if (selectedMethod === 'fileUpload') {
      total = uploadedFiles.reduce((sum, file) => sum + file.members, 0);
    }
    setTotalMembers(total);

    const newHistoryRecord = {
      id: Date.now(),
      action: 'Activity Started',
      status: 'IN PROGRESS',
      timestamp: new Date().toLocaleString(),
      user: 'Current User',
      details: `Started batch activity for ${total} members`,
    };

    setHistoryRecords(prev => [newHistoryRecord, ...prev]);
    setIsSubmitted(true);
    setSubmissionStatus('IN PROGRESS');
    setSubmissionProgress(0);
    setSubmissionStatusLabel(`In progress (0 of ${total})`);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 10;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setSubmissionStatus('COMPLETE');
        setSubmissionStatusLabel(`Complete (${total} of ${total})`);
        setProcessedMembers(total);

        const completionRecord = {
          id: Date.now() + 1,
          action: 'Activity Completed',
          status: 'COMPLETE',
          timestamp: new Date().toLocaleString(),
          user: 'System',
          details: `Successfully processed ${total} members`,
        };
        setHistoryRecords(prev => [completionRecord, ...prev]);

        clearInterval(interval);
      } else {
        const processed = Math.floor((currentProgress / 100) * total);
        setSubmissionStatusLabel(`In progress (${processed} of ${total})`);
        setProcessedMembers(processed);
      }
      setSubmissionProgress(currentProgress);
    }, 1000);
  };

  const handleCancelSubmit = () => {
    setShowConfirmModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NOT EXECUTED':
        return 'bg-gray-100 text-gray-500';
      case 'IN PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETE':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case 'IN PROGRESS':
        return '#047876';
      case 'COMPLETE':
        return '#047876';
      default:
        return '#d1d5db';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (segmentDropdownRef.current && !segmentDropdownRef.current.contains(event.target as Node)) {
        setIsSegmentDropdownOpen(false);
      }
    };

    if (isSegmentDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSegmentDropdownOpen]);

  const handleSaveAsTemplate = () => {
    setShowSaveTemplateModal(true);
    setTemplateName('');
    setTemplateDescription('');
  };

  const handleCancelSaveTemplate = () => {
    setShowSaveTemplateModal(false);
    setTemplateName('');
    setTemplateDescription('');
  };

  const handleSaveTemplate = () => {
    if (templateName.trim()) {
      console.log('Saving template:', {
        name: templateName,
        description: templateDescription,
        criteria: ruleGroups,
      });

      setShowSaveTemplateModal(false);
      setTemplateName('');
      setTemplateDescription('');

      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
    }
  };

  const handleAddRuleGroup = () => {
    const newGroup = {
      id: Date.now(),
      operator: 'All',
      rules: [
        {
          id: Date.now() + 1,
          attribute: 'Attributes',
          condition: 'equal',
          value: '',
        },
      ],
      nestedGroups: [],
    };
    setRuleGroups(prev => [...prev, newGroup]);
  };

  const handleAddRule = (groupId: number, isNested = false, parentGroupId?: number) => {
    const newRule = {
      id: Date.now(),
      attribute: 'Attributes',
      condition: 'equal',
      value: '',
    };

    if (isNested && parentGroupId) {
      setRuleGroups(prev =>
        prev.map(group =>
          group.id === parentGroupId
            ? {
                ...group,
                nestedGroups: group.nestedGroups.map(nested =>
                  nested.id === groupId ? { ...nested, rules: [...nested.rules, newRule] } : nested
                ),
              }
            : group
        )
      );
    } else {
      setRuleGroups(prev =>
        prev.map(group => (group.id === groupId ? { ...group, rules: [...group.rules, newRule] } : group))
      );
    }
  };

  const handleAddNestedGroup = (parentGroupId: number) => {
    const newNestedGroup = {
      id: Date.now(),
      operator: 'All',
      rules: [
        {
          id: Date.now() + 1,
          attribute: 'Attributes',
          condition: 'equal',
          value: '',
        },
      ],
      nestedGroups: [],
    };

    setRuleGroups(prev =>
      prev.map(group =>
        group.id === parentGroupId
          ? { ...group, nestedGroups: [...group.nestedGroups, newNestedGroup] }
          : group
      )
    );
  };

  const handleDeleteRule = (ruleId: number, groupId: number, isNested = false, parentGroupId?: number) => {
    if (isNested && parentGroupId) {
      setRuleGroups(prev =>
        prev.map(group =>
          group.id === parentGroupId
            ? {
                ...group,
                nestedGroups: group.nestedGroups.map(nested =>
                  nested.id === groupId ? { ...nested, rules: nested.rules.filter(rule => rule.id !== ruleId) } : nested
                ),
              }
            : group
        )
      );
    } else {
      setRuleGroups(prev =>
        prev.map(group => (group.id === groupId ? { ...group, rules: group.rules.filter(rule => rule.id !== ruleId) } : group))
      );
    }
  };

  const handleDeleteGroup = (groupId: number, isNested = false, parentGroupId?: number) => {
    if (isNested && parentGroupId) {
      setRuleGroups(prev =>
        prev.map(group =>
          group.id === parentGroupId
            ? { ...group, nestedGroups: group.nestedGroups.filter(nested => nested.id !== groupId) }
            : group
        )
      );
    } else {
      setRuleGroups(prev => prev.filter(group => group.id !== groupId));
    }
  };

  const handleOperatorChange = (groupId: number, operator: string, isNested = false, parentGroupId?: number) => {
    if (isNested && parentGroupId) {
      setRuleGroups(prev =>
        prev.map(group =>
          group.id === parentGroupId
            ? {
                ...group,
                nestedGroups: group.nestedGroups.map(nested =>
                  nested.id === groupId ? { ...nested, operator } : nested
                ),
              }
            : group
        )
      );
    } else {
      setRuleGroups(prev =>
        prev.map(group => (group.id === groupId ? { ...group, operator } : group))
      );
    }
  };

  const handleRuleChange = (
    ruleId: number,
    field: string,
    value: string,
    groupId: number,
    isNested = false,
    parentGroupId?: number
  ) => {
    if (isNested && parentGroupId) {
      setRuleGroups(prev =>
        prev.map(group =>
          group.id === parentGroupId
            ? {
                ...group,
                nestedGroups: group.nestedGroups.map(nested =>
                  nested.id === groupId
                    ? {
                        ...nested,
                        rules: nested.rules.map(rule => (rule.id === ruleId ? { ...rule, [field]: value } : rule)),
                      }
                    : nested
                ),
              }
            : group
        )
      );
    } else {
      setRuleGroups(prev =>
        prev.map(group =>
          group.id === groupId
            ? {
                ...group,
                rules: group.rules.map(rule => (rule.id === ruleId ? { ...rule, [field]: value } : rule)),
              }
            : group
        )
      );
    }
  };

  const updateNestedGroup = (
    targetGroupId: number,
    parentGroupId: number,
    updateFn: (nested: any) => any,
    isDoubleNested = false,
    grandParentId?: number
  ) => {
    setRuleGroups(prev => {
      if (isDoubleNested && grandParentId && prev.length > 0) {
        return prev.map(group => {
          if (group.id === grandParentId) {
            return {
              ...group,
              nestedGroups: group.nestedGroups.map(nested =>
                nested.id === parentGroupId
                  ? {
                      ...nested,
                      nestedGroups: nested.nestedGroups.map(doubleNested =>
                        doubleNested.id === targetGroupId ? updateFn(doubleNested) : doubleNested
                      ),
                    }
                  : nested
              ),
            };
          }
          return group;
        });
      } else if (prev.length > 0) {
        return prev.map(group =>
          group.id === parentGroupId
            ? {
                ...group,
                nestedGroups: group.nestedGroups.map(nested =>
                  nested.id === targetGroupId ? updateFn(nested) : nested
                ),
              }
            : group
        );
      }
    });
  };

  const handleAddNestedGroupToNested = (parentGroupId: number, nestedGroupId: number) => {
    const newDoubleNestedGroup = {
      id: Date.now(),
      operator: 'All',
      rules: [
        {
          id: Date.now() + 1,
          attribute: 'Attributes',
          condition: 'equal',
          value: '',
        },
      ],
      nestedGroups: [],
    };

    updateNestedGroup(nestedGroupId, parentGroupId, nested => ({ ...nested, nestedGroups: [...nested.nestedGroups, newDoubleNestedGroup] }));
  };

  const handleOperatorChangeForNested = (
    groupId: number,
    operator: string,
    parentGroupId: number,
    isDoubleNested = false,
    grandParentId?: number
  ) => {
    updateNestedGroup(groupId, parentGroupId, nested => ({ ...nested, operator }), isDoubleNested, grandParentId);
  };

  const handleDeleteNestedGroup = (
    groupId: number,
    parentGroupId: number,
    isDoubleNested = false,
    grandParentId?: number
  ) => {
    if (isDoubleNested && grandParentId) {
      updateNestedGroup(
        parentGroupId,
        grandParentId,
        nested => ({
          ...nested,
          nestedGroups: nested.nestedGroups.filter(doubleNested => doubleNested.id !== groupId),
        })
      );
    } else {
      setRuleGroups(prev =>
        prev.map(group =>
          group.id === parentGroupId
            ? { ...group, nestedGroups: group.nestedGroups.filter(nested => nested.id !== groupId) }
            : group
        )
      );
    }
  };

  const handleAddRuleToNested = (
    groupId: number,
    parentGroupId: number,
    isDoubleNested = false,
    grandParentId?: number
  ) => {
    const newRule = {
      id: Date.now(),
      attribute: 'Attributes',
      condition: 'equal',
      value: '',
    };

    updateNestedGroup(groupId, parentGroupId, nested => ({ ...nested, rules: [...nested.rules, newRule] }), isDoubleNested, grandParentId);
  };

  const handleDeleteRuleFromNested = (
    ruleId: number,
    groupId: number,
    parentGroupId: number,
    isDoubleNested = false,
    grandParentId?: number
  ) => {
    updateNestedGroup(groupId, parentGroupId, nested => ({ ...nested, rules: nested.rules.filter(rule => rule.id !== ruleId) }), isDoubleNested, grandParentId);
  };

  const handleRuleChangeInNested = (
    ruleId: number,
    field: string,
    value: string,
    groupId: number,
    parentGroupId: number,
    isDoubleNested = false,
    grandParentId?: number
  ) => {
    updateNestedGroup(groupId, parentGroupId, nested => ({
      ...nested,
      rules: nested.rules.map(rule => (rule.id === ruleId ? { ...rule, [field]: value } : rule)),
    }), isDoubleNested, grandParentId);
  };

  const renderNestedGroup = (group: any, parentGroupId: number, nestedIndex = 0, isDoubleNested = false, grandParentId?: number) => (
    <div key={group.id} className={`border border-gray-200 rounded-lg p-4 bg-white ${isDoubleNested ? 'ml-8 mt-4' : 'ml-8 mt-4'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-700 flex items-center space-x-2">
          <span>Include customers that meet</span>
          <div className="relative">
            <select
              value={group.operator}
              onChange={e => handleOperatorChangeForNested(group.id, e.target.value, parentGroupId, isDoubleNested, grandParentId)}
              className="px-3 py-1 border border-gray-300 rounded text-sm bg-white pr-8 appearance-none focus:outline-none focus:border-teal-600"
              style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
            >
              <option value="All">All</option>
              <option value="Some">Some</option>
            </select>
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <i className="ri-arrow-down-s-line text-gray-400 text-xs"></i>
            </div>
          </div>
          <span>of the following</span>
        </div>
        <button
          onClick={() => handleDeleteNestedGroup(group.id, parentGroupId, isDoubleNested, grandParentId)}
          className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer"
        >
          <i className="ri-delete-bin-line text-gray-400 hover:text-red-500"></i>
        </button>
      </div>

      <div className="space-y-3">
        {group.rules.map((rule: any, ruleIndex: number) => (
          <div key={rule.id}>
            {ruleIndex > 0 && (
              <div className="flex items-center my-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                  {group.operator === 'All' ? 'AND' : 'OR'}
                </span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <select
                  value={rule.attribute}
                  onChange={e => handleRuleChangeInNested(rule.id, 'attribute', e.target.value, group.id, parentGroupId, isDoubleNested, grandParentId)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white pr-8 appearance-none focus:outline-none focus:border-teal-600"
                  style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
                >
                  <option>Attributes</option>
                  <option>Purchase Amount</option>
                  <option>Purchase Frequency</option>
                  <option>Last Purchase Date</option>
                  <option>Registration Date</option>
                  <option>App Usage</option>
                  <option>Location</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <i className="ri-arrow-down-s-line text-gray-400"></i>
                </div>
              </div>
              <div className="relative">
                <select
                  value={rule.condition}
                  onChange={e => handleRuleChangeInNested(rule.id, 'condition', e.target.value, group.id, parentGroupId, isDoubleNested, grandParentId)}
                  className="px-3 py-2 border border-gray-300 rounded text-sm bg-white pr-8 appearance-none focus:outline-none focus:border-teal-600"
                  style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
                >
                  <option>equal</option>
                  <option>greater than</option>
                  <option>less than</option>
                  <option>contains</option>
                  <option>not equal</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <i className="ri-arrow-down-s-line text-gray-400"></i>
                </div>
              </div>
              <input
                type="text"
                value={rule.value}
                onChange={e => handleRuleChangeInNested(rule.id, 'value', e.target.value, group.id, parentGroupId, isDoubleNested, grandParentId)}
                placeholder="Enter value"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600"
                style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
              />
              <button
                onClick={() => handleDeleteRuleFromNested(rule.id, group.id, parentGroupId, isDoubleNested, grandParentId)}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer"
              >
                <i className="ri-close-line text-gray-400 hover:text-red-500"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4 mt-4">
        <button
          type="button"
          onClick={() => handleAddRuleToNested(group.id, parentGroupId, isDoubleNested, grandParentId)}
          className="text-teal-600 text-sm cursor-pointer flex items-center space-x-1 hover:text-teal-700"
          style={{ color: '#047876' }}
        >
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-add-line"></i>
          </div>
          <span>Add Rule</span>
        </button>
        <button
          type="button"
          onClick={() => isDoubleNested ? handleAddNestedGroupToNested(grandParentId!, group.id) : handleAddNestedGroupToNested(parentGroupId, group.id)}
          className="text-gray-600 text-sm cursor-pointer flex items-center space-x-1 hover:text-gray-700"
        >
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-add-circle-line"></i>
          </div>
          <span>Add Nested Group</span>
        </button>
      </div>

      {group.nestedGroups && group.nestedGroups.map((doubleNestedGroup: any, doubleNestedIndex: number) => (
        <div key={doubleNestedGroup.id}>
          {doubleNestedIndex === 0 && (
            <div className="flex items-center mt-4 mb-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                {group.operator === 'All' ? 'AND' : 'OR'}
              </span>
            </div>
          )}
          {renderNestedGroup(doubleNestedGroup, group.id, doubleNestedIndex, true, parentGroupId)}
        </div>
      ))}
    </div>
  );

  const renderRuleGroup = (group: any, isNested = false, parentGroupId?: number, groupIndex = 0) => (
    <div key={group.id} className={`border border-gray-200 rounded-lg p-4 bg-white ${isNested ? 'ml-8 mt-4' : ''}`}>
      {groupIndex > 0 && !isNested && (
        <div className="flex items-center mb-4">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded">OR</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-700 flex items-center space-x-2">
          <span>Include customers that meet</span>
          <div className="relative">
            <select
              value={group.operator}
              onChange={e => handleOperatorChange(group.id, e.target.value, isNested, parentGroupId)}
              className="px-3 py-1 border border-gray-300 rounded text-sm bg-white pr-8 appearance-none focus:outline-none focus:border-teal-600"
              style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
            >
              <option value="All">All</option>
              <option value="Some">Some</option>
            </select>
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <i className="ri-arrow-down-s-line text-gray-400 text-xs"></i>
            </div>
          </div>
          <span>of the following</span>
        </div>
        {(ruleGroups.length > 1 || isNested) && (
          <button
            onClick={() => handleDeleteGroup(group.id, isNested, parentGroupId)}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer"
          >
            <i className="ri-delete-bin-line text-gray-400 hover:text-red-500"></i>
          </button>
        )}
      </div>

      <div className="space-y-3">
        {group.rules.map((rule: any, ruleIndex: number) => (
          <div key={rule.id}>
            {ruleIndex > 0 && (
              <div className="flex items-center my-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                  {group.operator === 'All' ? 'AND' : 'OR'}
                </span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <select
                  value={rule.attribute}
                  onChange={e => handleRuleChange(rule.id, 'attribute', e.target.value, group.id, isNested, parentGroupId)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white pr-8 appearance-none focus:outline-none focus:border-teal-600"
                  style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
                >
                  <option>Attributes</option>
                  <option>Purchase Amount</option>
                  <option>Purchase Frequency</option>
                  <option>Last Purchase Date</option>
                  <option>Registration Date</option>
                  <option>App Usage</option>
                  <option>Location</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <i className="ri-arrow-down-s-line text-gray-400"></i>
                </div>
              </div>
              <div className="relative">
                <select
                  value={rule.condition}
                  onChange={e => handleRuleChange(rule.id, 'condition', e.target.value, group.id, isNested, parentGroupId)}
                  className="px-3 py-2 border border-gray-300 rounded text-sm bg-white pr-8 appearance-none focus:outline-none focus:border-teal-600"
                  style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
                >
                  <option>equal</option>
                  <option>greater than</option>
                  <option>less than</option>
                  <option>contains</option>
                  <option>not equal</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <i className="ri-arrow-down-s-line text-gray-400"></i>
                </div>
              </div>
              <input
                type="text"
                value={rule.value}
                onChange={e => handleRuleChange(rule.id, 'value', e.target.value, group.id, isNested, parentGroupId)}
                placeholder="Enter value"
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600"
                style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
              />
              <button
                onClick={() => handleDeleteRule(rule.id, group.id, isNested, parentGroupId)}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer"
              >
                <i className="ri-close-line text-gray-400 hover:text-red-500"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4 mt-4">
        <button
          type="button"
          onClick={() => handleAddRule(group.id, isNested, parentGroupId)}
          className="text-teal-600 text-sm cursor-pointer flex items-center space-x-1 hover:text-teal-700"
          style={{ color: '#047876' }}
        >
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-add-line"></i>
          </div>
          <span>Add Rule</span>
        </button>
        <button
          type="button"
          onClick={() => handleAddNestedGroup(group.id)}
          className="text-gray-600 text-sm cursor-pointer flex items-center space-x-1 hover:text-gray-700"
        >
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-add-circle-line"></i>
          </div>
          <span>Add Nested Group</span>
        </button>
      </div>

      {group.nestedGroups && group.nestedGroups.map((nestedGroup: any, nestedIndex: number) => (
        <div key={nestedGroup.id}>
          {nestedIndex === 0 && (
            <div className="flex items-center mt-4 mb-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                {group.operator === 'All' ? 'AND' : 'OR'}
              </span>
            </div>
          )}
          {renderNestedGroup(nestedGroup, group.id, nestedIndex)}
        </div>
      ))}
    </div>
  );

  const handleClearAllCriteria = () => {
    setRuleGroups([
      {
        id: 1,
        operator: 'All',
        rules: [
          {
            id: 1,
            attribute: 'Attributes',
            condition: 'equal',
            value: '',
          },
        ],
        nestedGroups: [],
      },
    ]);
  };

  return (
    <div className="bg-white">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-2">
          <Link
            href="/"
            className="text-teal-600 hover:text-teal-700 cursor-pointer"
            style={{ color: '#047876' }}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-arrow-left-line"></i>
            </div>
          </Link>
          <Link
            href="/"
            className="text-teal-600 text-sm cursor-pointer"
            style={{ color: '#047876' }}
          >
            Back to Batch Activities
          </Link>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Quarterly Point Boost</h1>
      </div>

      <div className="px-6 py-6" style={{ backgroundColor: 'white' }}>
        <div className="bg-gray-100 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-col flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Quarterly Point Boost</h2>
              <p className="text-sm text-gray-600 mb-6">Quarterly loyalty bonus for premium members</p>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-settings-line text-gray-500"></i>
                  </div>
                  <span className="text-sm text-gray-700">{activityType}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-user-line text-gray-500"></i>
                  </div>
                  <span className="text-sm text-gray-700">
                    {isSubmitted ? `${processedMembers}/${totalMembers} members processed` : '-/- members processed'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-star-line text-gray-500"></i>
                  </div>
                  <span className="text-sm text-gray-700">
                    {activityType === 'Earn Adjustment' ? `${amount || '-'} points each` : '-/- points each'}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-px bg-gray-300 h-32 mx-4"></div>
            <div className="flex flex-col min-w-0" style={{ width: '300px' }}>
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(submissionStatus)}`}
                >
                  {submissionStatus}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    className={`w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer ${submissionStatus === 'IN PROGRESS' ? '' : 'opacity-50'}`}
                  >
                    <i className="ri-stop-circle-line text-gray-400"></i>
                  </button>
                  <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer opacity-50">
                    <i className="ri-eye-line text-gray-400"></i>
                  </button>
                  <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer opacity-50">
                    <i className="ri-download-line text-gray-400"></i>
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Status:</span>
                  <span className="text-xs text-gray-600 font-medium">
                    {isSubmitted ? submissionStatus : '-/-'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Processed on:</span>
                  <span className="text-xs text-gray-600 font-medium">
                    {isSubmitted ? new Date().toLocaleDateString() : '-/-'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-1000"
                      style={{
                        width: `${submissionProgress}%`,
                        backgroundColor: getProgressBarColor(submissionStatus),
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 font-medium ml-2">
                    {submissionStatusLabel}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Last Execution:</span>
                  <span className="text-xs text-gray-600 font-medium">
                    {isSubmitted ? new Date().toLocaleString() : '-/-'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="space-y-6">
          <div className="border border-gray-200 rounded">
            <button
              type="button"
              onClick={() => handleSectionToggle('configure')}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer bg-gray-100 text-gray-500"
            >
              <span className="font-medium">Configure Activity</span>
              <div className="w-4 h-4 flex items-center justify-center">
                <i className={`ri-arrow-${isConfigureExpanded ? 'up' : 'down'}-s-line text-gray-400`}></i>
              </div>
            </button>
            {isConfigureExpanded && (
              <div className="border-t border-gray-200 px-4 py-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Activity Date and Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={activityDateTime}
                      onChange={e => setActivityDateTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600"
                      style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Zone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={timeZone}
                        onChange={e => setTimeZone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600 bg-white pr-8 appearance-none"
                        style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
                      >
                        <option>GMT+00:00 Etc/UTC (UTC)</option>
                        <option>GMT-05:00 America/New_York (EST)</option>
                        <option>GMT-08:00 America/Los_Angeles (PST)</option>
                      </select>
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <i className="ri-arrow-down-s-line text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                  {renderActivityTypeFields()}
                </div>
                {activityType !== 'Update Member Attribute' && (
                  <div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason
                      </label>
                      <textarea
                        placeholder="Enter Reason"
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600 h-20 resize-none"
                        style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
                      />
                      <p className="text-xs text-gray-500 mt-1">This will be added as the activity label</p>
                    </div>
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Internal Notes
                      </label>
                      <textarea
                        placeholder="Enter Internal notes"
                        value={internalNotes}
                        onChange={e => setInternalNotes(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600 h-24 resize-none"
                        style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
                      />
                      <p className="text-xs text-gray-500 mt-1">This will be added into the activity comments</p>
                    </div>
                    {activityType !== 'Tier Adjustment' && (
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={location}
                          onChange={e => setLocation(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600"
                          style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          You can search the name of the Location, or for a Location Category for filtering results
                        </p>
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-6 flex justify-end">
                  <button
                    className="px-4 py-2 text-white rounded text-sm cursor-pointer whitespace-nowrap"
                    style={{ backgroundColor: '#047876' }}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded">
            <button
              type="button"
              onClick={() => handleSectionToggle('audience')}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer bg-gray-100 text-gray-500"
            >
              <span className="font-medium">Define Audience</span>
              <div className="w-4 h-4 flex items-center justify-center">
                <i className={`ri-arrow-${isAudienceExpanded ? 'up' : 'down'}-s-line text-gray-400`}></i>
              </div>
            </button>
            {isAudienceExpanded && (
              <div className="border-t border-gray-200 px-4 py-6">
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Choose the method to select members for this batch activity
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        name="audienceMethod"
                        checked={selectedMethod === 'segments'}
                        onChange={() => handleMethodChange('segments')}
                        className="mt-1 w-4 h-4 border-gray-300 cursor-pointer"
                        style={{ accentColor: '#047876' }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-gray-900 cursor-pointer">
                            Select Segments
                          </label>
                          <div className="flex items-center space-x-4 text-xs text-gray-600">
                            <span>Estimated Audiences: 6,536</span>
                            <span>Estimated Time: 1h</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">Search and select Published Segments</p>

                        {selectedMethod === 'segments' && (
                          <div className="mb-4 relative" ref={segmentDropdownRef}>
                            <input
                              type="text"
                              placeholder="Search by name, tags, or categories..."
                              value={segmentSearchValue}
                              onChange={e => setSegmentSearchValue(e.target.value)}
                              onFocus={() => setIsSegmentDropdownOpen(true)}
                              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-400 bg-gray-50"
                            />

                            {isSegmentDropdownOpen && (
                              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                                <div className="p-4">
                                  <div className="max-h-64 overflow-y-auto">
                                    {filteredSegments.map(segment => (
                                      <div
                                        key={segment.id}
                                        className="flex items-start space-x-3 py-2 hover:bg-gray-50 cursor-pointer"
                                        onClick={() => handleSegmentToggle(segment.id)}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={tempSelectedSegments.includes(segment.id)}
                                          onChange={() => handleSegmentToggle(segment.id)}
                                          className="mt-1 w-4 h-4 text-teal-600 border-gray-300 rounded cursor-pointer"
                                          style={{ accentColor: '#047876' }}
                                          onClick={e => e.stopPropagation()}
                                        />
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-900">{segment.name}</span>
                                            <span
                                              className={`px-2 py-1 text-xs rounded-full font-medium ${
                                                segment.status === 'Published'
                                                  ? 'bg-green-100 text-green-800'
                                                  : 'bg-gray-100 text-gray-600'
                                              }`}
                                            >
                                              {segment.status}
                                            </span>
                                          </div>
                                          <p className="text-xs text-gray-500 mt-1">{segment.description}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                                    <div className="text-xs text-gray-500">
                                      {tempSelectedSegments.length} segment(s) selected
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <button
                                        type="button"
                                        onClick={handleSelectAll}
                                        className="px-3 py-1 text-xs text-teal-600 hover:bg-teal-50 rounded cursor-pointer"
                                        style={{ color: '#047876' }}
                                      >
                                        Select All
                                      </button>
                                      <button
                                        type="button"
                                        onClick={handleClearAll}
                                        className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded cursor-pointer"
                                      >
                                        Clear All
                                      </button>
                                      <button
                                        type="button"
                                        onClick={handleApplySegments}
                                        className="px-3 py-1 text-xs bg-teal-600 text-white rounded hover:bg-teal-700 cursor-pointer whitespace-nowrap"
                                        style={{ backgroundColor: '#047876' }}
                                      >
                                        Apply
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        {selectedMethod === 'segments' && (
                          <div className="border border-gray-200 rounded">
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                  <tr>
                                    <th className="text-left px-4 py-3 font-medium text-gray-900">Segment</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-900">Status</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-900">Published</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-900">Effectivity</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-900">Member</th>
                                    <th className="text-left px-4 py-3 font-medium text-gray-900">Action</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                  {selectedSegmentData.length > 0 ? (
                                    selectedSegmentData.map((segment: any) => (
                                      <tr key={segment.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">
                                          <span
                                            className="text-teal-600 font-medium cursor-pointer hover:underline"
                                            style={{ color: '#047876' }}
                                          >
                                            {segment.name}
                                          </span>
                                        </td>
                                        <td className="px-4 py-3">
                                          <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-gray-900">{segment.status}</span>
                                          </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-700">{segment.publishedDate}</td>
                                        <td className="px-4 py-3 text-gray-700">{segment.effectivity}</td>
                                        <td className="px-4 py-3 text-gray-900 font-medium">
                                          {segment.members.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3">
                                          <button
                                            onClick={() => handleDeleteSegment(segment.id)}
                                            className="w-4 h-4 flex items-center justify-center hover:bg-gray-200 rounded cursor-pointer"
                                          >
                                            <i className="ri-delete-bin-line text-gray-400 hover:text-red-500"></i>
                                          </button>
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td colSpan={6} className="px-4 py-12 text-center">
                                        <div className="flex flex-col items-center space-y-3">
                                          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full">
                                            <i className="ri-file-list-line text-gray-400 text-xl"></i>
                                          </div>
                                          <div className="text-gray-500">
                                            <p className="text-sm font-medium">No segments selected</p>
                                            <p className="text-xs mt-1">Add segments to see them here</p>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                        {selectedMethod === 'segments' && (
                          <div className="mt-4 flex justify-end">
                            <button
                              className="text-teal-600 text-sm hover:text-teal-700 cursor-pointer flex items-center space-x-1"
                              style={{ color: '#047876' }}
                            >
                              <div className="w-4 h-4 flex items-center justify-center">
                                <i className="ri-refresh-line"></i>
                              </div>
                              <span>Refresh Segments</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          name="audienceMethod"
                          checked={selectedMethod === 'fileUpload'}
                          onChange={() => handleMethodChange('fileUpload')}
                          className="mt-1 w-4 h-4 border-gray-300 cursor-pointer"
                          style={{ accentColor: '#047876' }}
                        />
                        <div className="flex-1">
                          <label className="text-sm font-medium text-gray-900 cursor-pointer">File Upload</label>
                          <p className="text-xs text-gray-600 mb-4">
                            Upload CSV file with included member identifier (e.g. Member ID, email)
                          </p>

                          {selectedMethod === 'fileUpload' && (
                            <div className="space-y-4">
                              <div className="flex items-center space-x-3">
                                <button
                                  type="button"
                                  onClick={handleFileUpload}
                                  className="px-4 py-2 border border-gray-300 rounded text-sm bg-white hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                                >
                                  Choose File
                                </button>
                                <input
                                  type="text"
                                  value={selectedFileName}
                                  readOnly
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm bg-gray-50 text-gray-500"
                                />
                              </div>

                              {uploadedFiles.length > 0 ? (
                                <div className="border border-gray-200 rounded">
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                          <th className="text-left px-4 py-3 font-medium text-gray-900">File Name</th>
                                          <th className="text-left px-4 py-3 font-medium text-gray-900">Member</th>
                                          <th className="text-left px-4 py-3 font-medium text-gray-900">Action</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-200">
                                        {uploadedFiles.map(file => (
                                          <tr key={file.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">
                                              <span
                                                className="text-teal-600 font-medium cursor-pointer hover:underline"
                                                style={{ color: '#047876' }}
                                              >
                                                {file.name}
                                              </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-900 font-medium">
                                              {file.members.toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3">
                                              <button
                                                onClick={() => handleDeleteFile(file.id)}
                                                className="w-4 h-4 flex items-center justify-center hover:bg-gray-200 rounded cursor-pointer"
                                              >
                                                <i className="ri-delete-bin-line text-gray-400 hover:text-red-500"></i>
                                              </button>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              ) : (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 bg-gray-50">
                                  <div className="text-center">
                                    <p className="text-gray-500 text-sm">No files uploaded</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="radio"
                        name="audienceMethod"
                        checked={selectedMethod === 'criteria'}
                        onChange={() => handleMethodChange('criteria')}
                        className="mt-1 w-4 h-4 border-gray-300 cursor-pointer"
                        style={{ accentColor: '#047876' }}
                      />
                      <div className="flex-1">
                        <label className="text-sm font-medium text-gray-900 cursor-pointer">Criteria</label>
                        <p className="text-xs text-gray-600 mb-4">Build custom rules to define your audience</p>

                        {selectedMethod === 'criteria' && (
                          <div>
                            {!showCriteriaBuilder && !showTemplateModal ? (
                              <div className="bg-gray-50 border border-gray-200 rounded-lg p-12">
                                <div className="text-center">
                                  <p className="text-gray-600 text-sm">
                                    Choose a template to get a head start, or build your conditions manually.
                                  </p>
                                  <div className="flex items-center justify-center space-x-4 mt-4">
                                    <button
                                      type="button"
                                      onClick={handleCreateNewCriteria}
                                      className="px-6 py-2 text-white rounded text-sm cursor-pointer whitespace-nowrap"
                                      style={{ backgroundColor: '#047876' }}
                                    >
                                      Create New
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleStartFromTemplate}
                                      className="px-6 py-2 text-white rounded text-sm cursor-pointer whitespace-nowrap"
                                      style={{ backgroundColor: '#047876' }}
                                    >
                                      Start from Template
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : showTemplateModal && !showCriteriaBuilder ? (
                              <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-6">
                                  <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                      <button
                                        type="button"
                                        onClick={() => setShowTemplateModal(false)}
                                        className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 cursor-pointer"
                                        style={{ color: '#047876' }}
                                      >
                                        <div className="w-4 h-4 flex items-center justify-center">
                                          <i className="ri-arrow-left-line"></i>
                                        </div>
                                        <span>Back</span>
                                      </button>
                                      <h3 className="text-lg font-semibold text-gray-900">Choose a Template</h3>
                                    </div>
                                    <div className="flex items-center space-x-4 text-gray-500 text-sm">
                                      <span>Show Query</span>
                                      <div className="w-4 h-4 flex items-center justify-center">
                                        <i className="ri-code-line"></i>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    {templateCategories.map((template, index) => (
                                      <div
                                        key={index}
                                        className="border border-gray-200 rounded-lg p-4 hover:border-teal-300 cursor-pointer transition-colors"
                                        onClick={() => handleSelectTemplate(template)}
                                      >
                                        <div className="flex items-start space-x-3">
                                          <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded">
                                            <i className={`${template.icon} text-gray-600`}></i>
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-gray-900 mb-1">
                                              {template.title}
                                            </h4>
                                            <p className="text-xs text-gray-600 mb-2">
                                              {template.description}
                                            </p>
                                            <div className="flex items-center space-x-2">
                                              <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                                                {template.rulePreview}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="flex items-center space-x-1">
                                            <button
                                              className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer"
                                              onClick={e => {
                                                e.stopPropagation();
                                                navigator.clipboard.writeText(template.rulePreview);
                                              }}
                                            >
                                              <i className="ri-file-copy-line text-gray-400"></i>
                                            </button>
                                            <button
                                              className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer"
                                              onClick={e => e.stopPropagation()}
                                            >
                                              <i className="ri-external-link-line text-gray-400"></i>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ) : showCriteriaBuilder ? (
                              <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-6">
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between mb-6">
                                      <div className="flex items-center space-x-3">
                                        <button
                                          type="button"
                                          onClick={handleBackFromTemplate}
                                          className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 cursor-pointer"
                                          style={{ color: '#047876' }}
                                        >
                                          <div className="w-4 h-4 flex items-center justify-center">
                                            <i className="ri-arrow-left-line"></i>
                                          </div>
                                          <span>Back</span>
                                        </button>
                                        <h3 className="text-lg font-semibold text-gray-900">Criteria Builder</h3>
                                      </div>
                                      <div className="flex items-center space-x-4">
                                        <button
                                          type="button"
                                          onClick={handleSaveAsTemplate}
                                          className="text-teal-600 text-sm hover:text-teal-700 cursor-pointer flex items-center space-x-1"
                                          style={{ color: '#047876' }}
                                        >
                                          <span>Save as Template</span>
                                        </button>
                                        <button
                                          type="button"
                                          onClick={handleClearAllCriteria}
                                          className="text-gray-600 text-sm hover:text-gray-700 cursor-pointer"
                                        >
                                          Clear all
                                        </button>
                                        <div className="flex items-center space-x-2 text-gray-500 text-sm">
                                          <span>Show Query</span>
                                          <button className="w-4 h-4 flex items-center justify-center cursor-pointer">
                                            <i className="ri-information-line text-gray-400"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-lg">
                                      <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                          <button
                                            type="button"
                                            onClick={handleAddRuleGroup}
                                            className="px-4 py-2 text-white rounded text-sm cursor-pointer whitespace-nowrap"
                                            style={{ backgroundColor: '#047876' }}
                                          >
                                            + Add Rule Group
                                          </button>
                                          <button
                                            type="button"
                                            onClick={handleSaveAsTemplate}
                                            className="px-4 py-2 text-white rounded text-sm cursor-pointer whitespace-nowrap"
                                            style={{ backgroundColor: '#047876' }}
                                          >
                                            Save as Template
                                          </button>
                                          <button
                                            type="button"
                                            onClick={handleClearAllCriteria}
                                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                                          >
                                            Clear all
                                          </button>
                                          <div className="flex items-center space-x-2 ml-auto">
                                            <span className="text-sm text-gray-500">Show Query</span>
                                            <button className="w-4 h-4 flex items-center justify-center cursor-pointer">
                                              <i className="ri-information-line text-gray-400"></i>
                                            </button>
                                          </div>
                                        </div>

                                        <div className="space-y-4">
                                          {ruleGroups.map((group, groupIndex) => renderRuleGroup(group, false, undefined, groupIndex))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center py-8">
                                <p className="text-gray-600">Criteria builder will be displayed here</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={handleSubmitClick}
                        disabled={isSubmitted}
                        className={`px-6 py-2 text-white rounded text-sm whitespace-nowrap cursor-pointer ${isSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}
                        style={{ backgroundColor: '#047876' }}
                      >
                        {isSubmitted ? 'Submitted' : 'Submit'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded">
            <button
              type="button"
              onClick={() => handleSectionToggle('history')}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer bg-gray-100 text-gray-500"
            >
              <span className="font-medium">History</span>
              <div className="w-4 h-4 flex items-center justify-center">
                <i className={`ri-arrow-${isHistoryExpanded ? 'up' : 'down'}-s-line text-gray-400`}></i>
              </div>
            </button>
            {isHistoryExpanded && (
              <div className="border-t border-gray-200 px-4 py-6">
                {historyRecords.length > 0 ? (
                  <div className="space-y-4">
                    {historyRecords.map(record => (
                      <div key={record.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${record.status === 'IN PROGRESS' ? 'bg-blue-500' : record.status === 'COMPLETE' ? 'bg-green-500' : 'bg-gray-400'}`}
                        ></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900">{record.action}</h4>
                            <span
                              className={`px-2 py-1 text-xs rounded-full font-medium ${record.status === 'IN PROGRESS' ? 'bg-blue-100 text-blue-800' : record.status === 'COMPLETE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                            >
                              {record.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{record.details}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>{record.timestamp}</span>
                            <span>by {record.user}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">View the execution history of this batch activity.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Ready to assign?</h3>
              <button
                onClick={handleCancelSubmit}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer"
              >
                <i className="ri-close-line text-gray-500"></i>
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-700 mb-4">
                You are about to assign an activity to{' '}
                <span className="font-semibold text-teal-600" style={{ color: '#047876' }}>
                  {selectedSegmentData.reduce((sum, segment) => sum + segment.members, 0).toLocaleString()} members
                </span>
                .
              </p>
            </div>
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCancelSubmit}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="px-4 py-2 text-white rounded text-sm cursor-pointer whitespace-nowrap"
                style={{ backgroundColor: '#047876' }}
              >
                Confirm & Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {showMethodChangeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Warning</h3>
              <button
                onClick={handleCancelMethodChange}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer"
              >
                <i className="ri-close-line text-gray-500"></i>
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-700 mb-2">
                Changing the selection method will remove your current configuration.
              </p>
              <p className="text-sm text-gray-700">Do you want to continue?</p>
            </div>
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCancelMethodChange}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmMethodChange}
                className="px-4 py-2 text-white rounded text-sm cursor-pointer whitespace-nowrap"
                style={{ backgroundColor: '#047876' }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showBackWarningModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Return</h3>
              <button
                onClick={handleCancelBack}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer"
              >
                <i className="ri-close-line text-gray-500"></i>
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-700 mb-2">
                You have unsaved changes in the criteria builder.
              </p>
              <p className="text-sm text-gray-700">Returning will discard these changes. Are you sure you want to continue?</p>
            </div>
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCancelBack}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBack}
                className="px-4 py-2 text-white rounded text-sm cursor-pointer whitespace-nowrap"
                style={{ backgroundColor: '#047876' }}
              >
                Confirm Return
              </button>
            </div>
          </div>
        </div>
      )}

      {showSaveTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Save as Template</h3>
              <button
                onClick={handleCancelSaveTemplate}
                className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded cursor-pointer"
              >
                <i className="ri-close-line text-gray-500"></i>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={e => setTemplateName(e.target.value)}
                  placeholder="Enter template name"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600"
                  style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={templateDescription}
                  onChange={e => setTemplateDescription(e.target.value)}
                  placeholder="Enter template description (optional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-teal-600 h-20 resize-none"
                  style={{ '--tw-ring-color': '#047876' } as React.CSSProperties}
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCancelSaveTemplate}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded text-sm hover:bg-gray-50 cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTemplate}
                disabled={!templateName.trim()}
                className={`px-4 py-2 text-white rounded text-sm whitespace-nowrap cursor-pointer ${!templateName.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: '#047876' }}
              >
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessToast && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded shadow-lg z-50 flex items-center space-x-2">
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-check-line text-green-600"></i>
          </div>
          <span className="text-sm font-medium">Template saved successfully.</span>
        </div>
      )}
    </div>
  );
}

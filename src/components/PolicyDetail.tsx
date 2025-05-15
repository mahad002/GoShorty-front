import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// @ts-ignore
import { policyService } from '../service';
import { ArrowRightCircle, Download, FileText, ExternalLink, CheckCircle, Star, Car, Phone } from 'lucide-react'; // Import necessary icons
import UKFlag from '../assets/veh-reg-uk.png';
import AllianzLogo from '../assets/allianz-new.png'; // Assuming allianz-new.png is in assets
import documentsIcon from '../assets/documents-icon.svg';
import carIcon from '../assets/car-icon.svg';
// Interfaces based on the provided JSON structure
interface PolicyDocument {
  id: string;
  name: string;
  issued: string;
  status: 'Downloaded' | 'New' | string; // Allow for other statuses if any
  s3Url?: string;
}

interface PolicyDetailData {
  id: string;
  vehicle: string;
  registration: string;
  coverStart: string;
  coverEnd: string;
  status: string; // Changed from 'Expired' | 'Live' to string to match API response
  type: string;
  policyHolder: string;
  additionalDriver: string;
  insurerName: string;
  insurerClaimsLine: string;
  documents: PolicyDocument[];
}

const PolicyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState<PolicyDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Document Download handler function
  const handleDocumentDownload = async (docId: string) => {
    try {
      const response = await policyService.getDocumentDownloadUrl(docId);
      if (response.success && response.data.downloadUrl) {
        // Open the URL in a new tab
        window.open(response.data.downloadUrl, '_blank');
        
        // Update local state to show it's been downloaded
        if (policy) {
          setPolicy({
            ...policy,
            documents: policy.documents.map((doc: PolicyDocument) => 
              doc.id === docId ? { ...doc, status: 'Downloaded' } : doc
            )
          });
        }
      } else {
        console.error('Failed to get download URL');
      }
    } catch (err) {
      console.error('Error downloading document:', err);
    }
  };

  useEffect(() => {
    const fetchPolicyDetail = async () => {
      if (!id) {
        setError('Policy ID is missing');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        // Use the existing getPolicyById function from policyService
        const response = await policyService.getPolicyById(id);
        
        if (response.success) { 
          // The backend returns { policy: {...}, documents: [...] }
          const policyData = response.data.policy || response.data;
          const documents = response.data.documents || [];
          
          setPolicy({
            id: policyData._id || policyData.id || policyData.policyNumber,
            vehicle: policyData.vehicle,
            registration: policyData.registration,
            coverStart: policyData.coverStart,
            coverEnd: policyData.coverEnd,
            status: policyData.status,
            type: policyData.type || 'Car',
            policyHolder: policyData.policyHolder,
            additionalDriver: policyData.additionalDriver,
            insurerName: policyData.insurerName,
            insurerClaimsLine: policyData.insurerClaimsLine,
            documents: documents.map((doc: any) => ({
              id: doc._id,
              name: doc.name,
              issued: doc.issued,
              status: doc.status,
              s3Url: doc.s3Url
            }))
          });
        } else {
          setError(response.error || 'Failed to fetch policy details');
        }
      } catch (err) {
        console.error('Error fetching policy details:', err);
        setError('An unexpected error occurred while fetching policy details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPolicyDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="px-4 tablet-only-view:px-12 desktop-only:px-16 py-6 desktop-only:py-10 rounded-lg shadow-lg text-white bg-[#1d1e2c] flex justify-center items-center min-h-[600px]">
        <div className="h-12 w-12 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 tablet-only-view:px-12 desktop-only:px-16 py-6 desktop-only:py-10 rounded-lg shadow-lg text-white bg-[#1d1e2c]">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
          <p>Error: {error}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="mt-4 base-button button-style-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="px-4 tablet-only-view:px-12 desktop-only:px-16 py-6 desktop-only:py-10 rounded-lg shadow-lg text-white bg-[#1d1e2c] text-center">
        Policy not found.
         <button 
            onClick={() => navigate(-1)} 
            className="mt-4 base-button button-style-primary"
          >
            Go Back
          </button>
      </div>
    );
  }

  const isExpired = policy.status === 'Expired';
  const currentDate = new Date().toLocaleString('en-GB'); // Example timestamp

  // TODO: Implement the detailed UI layout based on the image and responsiveness requirements
  return (
    <div className="flex flex-col desktop-only:flex-row gap-4 w-full ">
      {/* Main content */}
      <div className="w-full desktop-only:w-3/4 ] rounded-lg overflow-hidden bg-[#1d1e2c]">
       <div className="desktop-only:px-16">
          <div className="p-4 tablet-only-view:p-8 desktop-only:p-12 bg-[#1d1e2c] text-white rounded-lg shadow-lg">
            {/* Header Section */}
            
            {/* Desktop View Header */}
            <div className="hidden desktop-only-view">
              <div className="flex flex-row justify-between items-center mb-2">
                <h1 className="text-2xl font-bold">Your selected policy</h1>
                <span className="text-xs text-gray-400">{currentDate}</span>
              </div>
              <hr className="border-white mb-6" />
            </div>
            
            {/* Tablet View Header */}
            <div className="hidden tablet-only-view">
              <div className="flex flex-row justify-between items-center mb-2">
                <h1 className="text-xl font-bold">Your selected policy</h1>
                <span className="text-xs text-gray-400">{currentDate}</span>
              </div>
              <hr className="border-white mb-6" />
            </div>
            
            {/* Mobile View Header */}
            <div className="mobile-only-view">
              <div className="flex flex-col items-center mb-2">
                <h1 className="text-lg font-bold mb-1">Your selected policy</h1>
                <span className="text-xs text-gray-400">{currentDate}</span>
              </div>
              <hr className="border-white mb-4" />
            </div>

            {/* Policy Info Bar */}
            
            {/* Desktop View Policy Bar */}
            <div className="hidden desktop-only-view">
              <div className="flex flex-row justify-between items-center bg-[#202132] p-4 rounded-lg mb-6">
                {/* License Plate */}
                <div className="bg-yellow-400 text-black rounded text-center font-bold flex items-center justify-center border-2 border-blue-800">
                  <div className="bg-blue-600 text-white text-xs self-stretch flex items-center justify-center">
                    <img src={UKFlag} alt="UK Flag" className="w-6 h-8 object-contain" />
                  </div>
                  <div className="flex items-center space-x-2 p-1 px-3 text-xl">
                    <span>{policy.registration}</span>
                  </div>
                </div>
                <div>
                  {isExpired ? (
                    <p className="text-red-400 font-semibold">This policy has expired</p>
                  ) : (
                    <p className="text-green-400 font-semibold">This policy is live</p>
                  )}
                </div>
                <button className="flex items-center space-x-2 bg-[#70ed9b] text-[#1d1e2c] px-4 py-2 rounded-full text-sm font-bold hover:bg-opacity-90 min-w-[120px] max-w-[150px] justify-center">
                  <span>Buy again</span>
                  <ArrowRightCircle size={16} strokeWidth={2} />
                </button>
              </div>
            </div>
            
            {/* Tablet View Policy Bar */}
            <div className="hidden tablet-only-view">
              <div className="flex flex-row justify-between items-center bg-[#202132] p-4 rounded-lg mb-6">
                {/* License Plate */}
                <div className="bg-yellow-400 text-black rounded text-center font-bold flex items-center justify-center border-2 border-blue-800">
                  <div className="bg-blue-600 text-white text-xs self-stretch flex items-center justify-center">
                    <img src={UKFlag} alt="UK Flag" className="w-6 h-8 object-contain" />
                  </div>
                  <div className="flex items-center space-x-2 p-1 px-3 text-xl">
                    <span>{policy.registration}</span>
                  </div>
                </div>
                <div>
                  {isExpired ? (
                    <p className="text-red-400 font-semibold">This policy has expired</p>
                  ) : (
                    <p className="text-green-400 font-semibold">This policy is live</p>
                  )}
                </div>
                <button className="flex items-center space-x-2 bg-[#70ed9b] text-[#1d1e2c] px-4 py-2 rounded-full text-sm font-bold hover:bg-opacity-90 min-w-[120px] max-w-[150px] justify-center">
                  <span>Buy again</span>
                  <ArrowRightCircle size={16} strokeWidth={2} />
                </button>
              </div>
            </div>
            
            {/* Mobile View Policy Bar */}
            <div className="mobile-only-view">
              <div className="flex flex-col items-center bg-[#202132] p-4 rounded-lg mb-6 gap-4">
                {/* License Plate */}
                <div className="bg-yellow-400 text-black rounded text-center font-bold flex items-center justify-center border-2 border-blue-800">
                  <div className="bg-blue-600 text-white text-xs self-stretch flex items-center justify-center">
                    <img src={UKFlag} alt="UK Flag" className="w-6 h-8 object-contain" />
                  </div>
                  <div className="flex items-center space-x-2 p-1 px-3 text-xl">
                    <span>{policy.registration}</span>
                  </div>
                </div>
                <div>
                  {isExpired ? (
                    <p className="text-red-400 font-semibold text-center">This policy has expired</p>
                  ) : (
                    <p className="text-green-400 font-semibold text-center">This policy is live</p>
                  )}
                </div>
                <button className="flex items-center space-x-2 bg-[#70ed9b] text-[#1d1e2c] px-4 py-2 rounded-full text-sm font-bold hover:bg-opacity-90 w-full max-w-[200px] justify-center">
                  <span>Buy again</span>
                  <ArrowRightCircle size={16} strokeWidth={2} />
                </button>
              </div>
            </div>
            
            {/* Policy Details */}
            
            {/* Desktop View Policy Details */}
            <div className="hidden desktop-only-view">
              <div className="flex flex-row gap-8 mb-6">
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Policy number:</p>
                  <p className="font-semibold">{policy.id}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Cover start:</p>
                  <p className="font-semibold">{policy.coverStart}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Cover end:</p>
                  <p className="font-semibold">{policy.coverEnd}</p>
                </div>
              </div>
              
              <div className="flex flex-row gap-8 mb-8">
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Vehicle:</p>
                  <p className="font-semibold">{policy.vehicle}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Policy holder:</p>
                  <p className="font-semibold">{policy.policyHolder}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Additional driver:</p>
                  <p className="font-semibold">{policy.additionalDriver}</p>
                </div>
              </div>
            </div>
            
            {/* Tablet View Policy Details */}
            <div className="hidden tablet-only-view">
              <div className="flex flex-row gap-6 mb-6">
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Policy number:</p>
                  <p className="font-semibold">{policy.id}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Cover start:</p>
                  <p className="font-semibold">{policy.coverStart}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Cover end:</p>
                  <p className="font-semibold">{policy.coverEnd}</p>
                </div>
              </div>
              
              <div className="flex flex-row gap-6 mb-8">
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Vehicle:</p>
                  <p className="font-semibold">{policy.vehicle}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Policy holder:</p>
                  <p className="font-semibold">{policy.policyHolder}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Additional driver:</p>
                  <p className="font-semibold">{policy.additionalDriver}</p>
                </div>
              </div>
            </div>
            
            {/* Mobile View Policy Details */}
            <div className="mobile-only-view">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-400">Policy number:</p>
                  <p className="font-semibold text-sm">{policy.id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Vehicle:</p>
                  <p className="font-semibold text-sm">{policy.vehicle}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Cover start:</p>
                  <p className="font-semibold text-sm">{policy.coverStart}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Cover end:</p>
                  <p className="font-semibold text-sm">{policy.coverEnd}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Policy holder:</p>
                  <p className="font-semibold text-sm">{policy.policyHolder}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Additional driver:</p>
                  <p className="font-semibold text-sm">{policy.additionalDriver}</p>
                </div>
              </div>
            </div>

            {/* Insurer Details */}
            
            {/* Desktop View Insurer Details */}
            <div className="hidden desktop-only-view">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <img src={carIcon} alt="Car Icon" className="w-6 h-6 object-contain" />
                  <h2 className="text-xl font-semibold">Insurer details</h2>
                </div>
                <hr className="border-white mb-4" />
                <div className="bg-[#202132] p-4 rounded-lg">
                  <div className="flex flex-row items-center justify-around gap-6">
                    <div className="flex items-center gap-4">
                      <div>
                        <img src={AllianzLogo} alt={`${policy.insurerName} Logo`} className="h-12 object-contain bg-white p-1 rounded"/>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Insurer name:</p>
                        <p className="font-semibold">{policy.insurerName}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Insurer claims line:</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Phone size={14} /> 
                        {policy.insurerClaimsLine}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tablet View Insurer Details */}
            <div className="hidden tablet-only-view">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <img src={carIcon} alt="Car Icon" className="w-6 h-6 object-contain" />
                  <h2 className="text-xl font-semibold">Insurer details</h2>
                </div>
                <hr className="border-white mb-4" />
                <div className="bg-[#202132] p-4 rounded-lg">
                  <div className="flex flex-row items-center justify-around gap-6">
                    <div className="flex items-center gap-4">
                      <div>
                        <img src={AllianzLogo} alt={`${policy.insurerName} Logo`} className="h-12 object-contain bg-white p-1 rounded"/>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Insurer name:</p>
                        <p className="font-semibold">{policy.insurerName}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Insurer claims line:</p>
                      <p className="font-semibold flex items-center gap-1">
                        <Phone size={14} /> 
                        {policy.insurerClaimsLine}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile View Insurer Details */}
            <div className="mobile-only-view">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <img src={carIcon} alt="Car Icon" className="w-5 h-5 object-contain" />
                  <h2 className="text-lg font-semibold">Insurer details</h2>
                </div>
                <hr className="border-white mb-3" />
                <div className="bg-[#202132] p-3 rounded-lg">
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex flex-col items-center gap-2">
                      <div>
                        <img src={AllianzLogo} alt={`${policy.insurerName} Logo`} className="h-10 object-contain bg-white p-1 rounded"/>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-400">Insurer name:</p>
                        <p className="font-semibold text-sm">{policy.insurerName}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Insurer claims line:</p>
                      <p className="font-semibold text-sm flex items-center justify-center gap-1">
                        <Phone size={12} /> 
                        {policy.insurerClaimsLine}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            
            {/* Desktop View Documents */}
            <div className="hidden desktop-only-view">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <img src={documentsIcon} alt="Documents Icon" className="w-6 h-6 object-contain" />
                  <h2 className="text-xl font-semibold">Documents</h2>
                </div>
                <hr className="border-white mb-4" />
                
                {/* Document Links/Buttons in one row */}
                <div className="flex flex-row gap-3 mb-6">
                  <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-500 hover:border-gray-400 text-white px-4 py-2 rounded-full text-sm font-medium">
                    <span>Policy wording</span>
                    <img src={documentsIcon} alt="Documents Icon" className="w-3 h-3 object-contain" />
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-500 hover:border-gray-400 text-white px-4 py-2 rounded-full text-sm font-medium">
                    <span>Terms of business</span>
                    <img src={documentsIcon} alt="Documents Icon" className="w-3 h-3 object-contain" />
                  </button>
                </div>

                {/* Documents Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left table-fixed">
                    <thead className="border-b border-gray-600 text-sm text-gray-400">
                      <tr>
                        <th className="py-2 px-3 w-[45%]">Name</th>
                        <th className="py-2 px-3 w-[25%]">Issued</th>
                        <th className="py-2 px-3 w-[15%]">Status</th>
                        <th className="py-2 px-3 w-[15%] text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {policy.documents.map((doc, index) => (
                        <tr key={index} className="text-sm">
                          <td className="py-3 px-3 break-words">{doc.name}</td>
                          <td className="py-3 px-3">{doc.issued}</td>
                          <td className="py-3 px-3">
                            {doc.status === 'Downloaded' && (
                              <span className="flex items-center gap-1 text-green-400">
                                <CheckCircle size={14} /> Downloaded
                              </span>
                            )}
                            {doc.status === 'New' && (
                              <span className="flex items-center gap-1 text-yellow-400">
                                <Star size={14} /> New
                              </span>
                            )}
                            {doc.status !== 'Downloaded' && doc.status !== 'New' && (
                              <span>{doc.status}</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button 
                              onClick={() => handleDocumentDownload(doc.id)}
                              className="flex items-center justify-end ml-auto space-x-1 bg-[#70ed9b] text-[#1d1e2c] px-3 py-1 rounded-full text-xs font-bold hover:bg-opacity-90"
                            >
                              <span>Download</span>
                              <Download size={14} strokeWidth={2}/>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Tablet View Documents */}
            <div className="hidden tablet-only-view">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <img src={documentsIcon} alt="Documents Icon" className="w-6 h-6 object-contain" />
                  <h2 className="text-xl font-semibold">Documents</h2>
                </div>
                <hr className="border-white mb-4" />
                
                {/* Document Links/Buttons in one row */}
                <div className="flex flex-row gap-3 mb-6">
                  <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-500 hover:border-gray-400 text-white px-4 py-2 rounded-full text-sm font-medium">
                    <span>Policy wording</span>
                    <img src={documentsIcon} alt="Documents Icon" className="w-3 h-3 object-contain" />
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-500 hover:border-gray-400 text-white px-4 py-2 rounded-full text-sm font-medium">
                    <span>Terms of business</span>
                    <img src={documentsIcon} alt="Documents Icon" className="w-3 h-3 object-contain" />
                  </button>
                </div>

                {/* Documents Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left table-fixed">
                    <thead className="border-b border-gray-600 text-sm text-gray-400">
                      <tr>
                        <th className="py-2 px-3 w-[45%]">Name</th>
                        <th className="py-2 px-3 w-[25%]">Issued</th>
                        <th className="py-2 px-3 w-[15%]">Status</th>
                        <th className="py-2 px-3 w-[15%] text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {policy.documents.map((doc, index) => (
                        <tr key={index} className="text-sm">
                          <td className="py-3 px-3 break-words">{doc.name}</td>
                          <td className="py-3 px-3">{doc.issued}</td>
                          <td className="py-3 px-3">
                            {doc.status === 'Downloaded' && (
                              <span className="flex items-center gap-1 text-green-400">
                                <CheckCircle size={14} /> Downloaded
                              </span>
                            )}
                            {doc.status === 'New' && (
                              <span className="flex items-center gap-1 text-yellow-400">
                                <Star size={14} /> New
                              </span>
                            )}
                            {doc.status !== 'Downloaded' && doc.status !== 'New' && (
                              <span>{doc.status}</span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button 
                              onClick={() => handleDocumentDownload(doc.id)}
                              className="flex items-center justify-end ml-auto space-x-1 bg-[#70ed9b] text-[#1d1e2c] px-3 py-1 rounded-full text-xs font-bold hover:bg-opacity-90"
                            >
                              <span>Download</span>
                              <Download size={14} strokeWidth={2}/>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Mobile View Documents */}
            <div className="mobile-only-view">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <img src={documentsIcon} alt="Documents Icon" className="w-5 h-5 object-contain" />
                  <h2 className="text-lg font-semibold">Documents</h2>
                </div>
                <hr className="border-white mb-3" />
                
                {/* Document Links/Buttons stacked for mobile */}
                <div className="flex flex-col gap-2 mb-4">
                  <button className="w-full flex items-center justify-center space-x-2 border border-gray-500 hover:border-gray-400 text-white px-3 py-2 rounded-full text-sm font-medium">
                    <span>Policy wording</span>
                    <img src={documentsIcon} alt="Documents Icon" className="w-3 h-3 object-contain" />
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 border border-gray-500 hover:border-gray-400 text-white px-3 py-2 rounded-full text-sm font-medium">
                    <span>Terms of business</span>
                    <img src={documentsIcon} alt="Documents Icon" className="w-3 h-3 object-contain" />
                  </button>
                </div>

                {/* Documents List for Mobile */}
                <div className="space-y-3">
                  {policy.documents.map((doc, index) => (
                    <div key={index} className="bg-[#202132] p-3 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <p className="font-semibold text-sm">{doc.name}</p>
                        <span className="text-xs text-gray-400">{doc.issued}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          {doc.status === 'Downloaded' && (
                            <span className="flex items-center gap-1 text-green-400 text-xs">
                              <CheckCircle size={12} /> Downloaded
                            </span>
                          )}
                          {doc.status === 'New' && (
                            <span className="flex items-center gap-1 text-yellow-400 text-xs">
                              <Star size={12} /> New
                            </span>
                          )}
                          {doc.status !== 'Downloaded' && doc.status !== 'New' && (
                            <span className="text-xs">{doc.status}</span>
                          )}
                        </div>
                        <button 
                          onClick={() => handleDocumentDownload(doc.id)}
                          className="flex items-center space-x-1 bg-[#70ed9b] text-[#1d1e2c] px-2 py-1 rounded-full text-xs font-bold hover:bg-opacity-90"
                        >
                          <span>Download</span>
                          <Download size={12} strokeWidth={2}/>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Navigation Section */}
            <hr className="border-white my-6" />
            
            {/* Desktop and Tablet Navigation */}
            <div className="hidden desktop-only-view tablet-only-view">
              <div className="flex justify-between">
                <button 
                  className="flex items-center space-x-2 text-white hover:text-blue-400"
                  onClick={() => navigate('/policies')}
                >
                  <ArrowRightCircle size={20} className="transform rotate-180 text-blue-400" />
                  <span>Back to ALL policies</span>
                </button>
                <button 
                  className="flex items-center space-x-2 text-white hover:text-blue-400"
                  onClick={() => navigate('/quotes')}
                >
                  <span>View QUOTES</span>
                  <ArrowRightCircle size={20} className="text-blue-400" />
                </button>
              </div>
            </div>
            
            {/* Mobile Navigation */}
            <div className="mobile-only-view">
              <div className="flex justify-between">
                <button 
                  className="flex items-center gap-1 text-white"
                  onClick={() => navigate('/policies')}
                >
                  <ArrowRightCircle size={16} className="transform rotate-180 text-blue-400" />
                  <span className="text-sm">Back to policies</span>
                </button>
                <button 
                  className="flex items-center gap-1 text-white"
                  onClick={() => navigate('/quotes')}
                >
                  <span className="text-sm">View quotes</span>
                  <ArrowRightCircle size={16} className="text-blue-400" />
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      {/* Sidebar - Reused from Dashboard */}
      <div className="dashboard-sidebar w-full desktop-only:w-1/4 relative mt-4 desktop-only:mt-0">
          <h2 className="dashboard-sidebar-header">New quote</h2>
          <button 
            onClick={() => navigate('/policies')} 
            className="text-white underline mb-4 block mx-auto"
          >
            View Policies
          </button>
          <p className="dashboard-sidebar-instructions">
            Enter a vehicle registration below to get a new quote:
          </p>
          <div className="dashboard-sidebar-input-wrap flex justify-center h-12 text-xl">
              <img src={UKFlag} alt="UK reg" />          
            <input 
              type="text" 
              placeholder="ENTER REG" 
              className="w-full text-3xl text-center font-bold"
            />
          </div>
          <div className="flex w-full justify-center">
            <button className="dashboard-sidebar-btn text-xl font-bold" 
            onClick={() => window.open('https://your.goshorty.co.uk/', '_blank')}
            >
              Get a Quote <ArrowRightCircle size={16} />
            </button>
          </div>
      </div>
    
    </div>
  );
};

export default PolicyDetail; 
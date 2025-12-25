import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import api from '../../lib/api';
import { 
  UploadCloud, 
  Loader2, 
  CheckCircle2, 
  FileText, 
  AlertCircle, 
  X,
  FileCheck,
  FileWarning
} from 'lucide-react';

interface Props {
  onUploadSuccess?: (data: any) => void;
}

const ResumeUpload: React.FC<Props> = ({ onUploadSuccess }) => {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [uploadResults, setUploadResults] = useState<any[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setFiles(acceptedFiles);
    setUploadResults([]);
    setStatus('uploading');
    setErrorMsg('');

    const formData = new FormData();
    acceptedFiles.forEach(file => {
        formData.append('files', file);
    });

    try {
      setStatus('analyzing'); 
      
      const response = await api.post('/resumes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploaded = response.data.uploaded || [];
      setUploadResults(uploaded);
      
      const hasErrors = uploaded.some((r: any) => r.error);
      
      if (hasErrors) {
           setStatus('error');
           const errorItem = uploaded.find((r: any) => r.error);
           setErrorMsg(errorItem ? "Some files failed to process." : "Upload failed.");
      } else {
           setStatus('success');
      }

      if (onUploadSuccess) {
          onUploadSuccess(uploaded.filter((r: any) => !r.error));
      }
      
      // Auto-reset after success
      if (!hasErrors) {
          setTimeout(() => {
              setStatus('idle');
              setFiles([]);
          }, 4000);
      }

    } catch (err: any) {
      console.error("Upload failed", err);
      setStatus('error');
      setErrorMsg(err.response?.data?.detail || "System Error: Upload process failed.");
    } 
  }, [onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {'application/pdf': ['.pdf']},
    multiple: true,
    disabled: status === 'uploading' || status === 'analyzing'
  });

  const getStatusColor = () => {
      switch(status) {
          case 'success': return 'border-emerald-400 bg-emerald-50/50';
          case 'error': return 'border-rose-300 bg-rose-50/50';
          case 'uploading': 
          case 'analyzing': return 'border-indigo-400 bg-indigo-50/30 cursor-wait';
          default: return isDragActive 
            ? 'border-indigo-500 bg-indigo-50 scale-[1.01] ring-4 ring-indigo-500/10' 
            : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50';
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto space-y-10">
             
             {/* Header */}
             <div className="text-center">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Add Candidates</h1>
                <p className="text-gray-500 mt-2 text-lg max-w-2xl mx-auto">
                    Bulk upload resumes to populate your talent pool. Our AI will automatically parse details and rank candidates.
                </p>
             </div>

             {/* Main Dropzone Area */}
             <div 
                {...getRootProps()} 
                className={`
                    relative rounded-3xl border-2 border-dashed p-10 sm:p-16
                    flex flex-col items-center justify-center text-center
                    transition-all duration-300 ease-out shadow-sm
                    ${getStatusColor()}
                `}
            >
                <input {...getInputProps()} />
                
                {/* IDLE STATE */}
                {status === 'idle' && (
                    <div className="space-y-6 pointer-events-none">
                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-indigo-200 transform group-hover:scale-105 transition-transform duration-300">
                            <UploadCloud className="w-10 h-10" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-2xl font-bold text-gray-900">
                                {isDragActive ? 'Drop files now' : 'Upload Resumes'}
                            </p>
                            <p className="text-gray-500 text-lg">
                                Drag & drop PDF files here, or <span className="text-indigo-600 font-semibold underline decoration-2 decoration-indigo-200 underline-offset-2">browse</span>
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-3 pt-4">
                             <div className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-500 shadow-sm uppercase tracking-wide">
                                PDF Only
                             </div>
                             <div className="px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-500 shadow-sm uppercase tracking-wide">
                                Max 10MB
                             </div>
                        </div>
                    </div>
                )}

                {/* LOADING / ANALYZING STATE */}
                {(status === 'uploading' || status === 'analyzing') && (
                    <div className="space-y-6">
                        <div className="relative w-24 h-24 mx-auto">
                             <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                             <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                             <div className="absolute inset-0 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-indigo-600 animate-pulse" />
                             </div>
                        </div>
                        <div>
                            <p className="text-xl font-bold text-gray-900">
                                {status === 'uploading' ? 'Uploading Documents...' : 'AI Analysis in Progress'}
                            </p>
                            <p className="text-indigo-600 font-medium mt-1">
                                Processing {files.length} candidate{files.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                )}

                {/* SUCCESS STATE */}
                {status === 'success' && (
                    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <div>
                             <p className="text-2xl font-bold text-gray-900">Upload Complete!</p>
                             <p className="text-emerald-600 font-medium mt-1">Redirecting you to the dashboard...</p>
                        </div>
                    </div>
                )}

                {/* ERROR STATE */}
                {status === 'error' && (
                    <div className="space-y-6 animate-in shake">
                        <div className="w-24 h-24 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <AlertCircle className="w-12 h-12" />
                        </div>
                        <div>
                             <p className="text-2xl font-bold text-gray-900">Something went wrong</p>
                             <p className="text-rose-500 font-medium mt-1 max-w-md mx-auto">{errorMsg}</p>
                        </div>
                        <button 
                             type="button"
                             onClick={(e) => { e.stopPropagation(); setStatus('idle'); setFiles([]); }}
                             className="px-6 py-2 bg-white border border-rose-200 text-rose-700 font-semibold rounded-xl hover:bg-rose-50 transition-colors shadow-sm"
                        >
                            Try Again
                        </button>
                    </div>
                )}
             </div>

             {/* File List Section */}
             {files.length > 0 && (
                <div className="bg-white rounded-3xl border border-gray-200 shadow-xl shadow-gray-200/50 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
                    <div className="px-8 py-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-white border border-gray-200 rounded-lg shadow-sm">
                                <FileText className="w-4 h-4 text-gray-500" />
                            </div>
                            <h3 className="font-bold text-gray-700">Upload Queue</h3>
                        </div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-white px-2 py-1 rounded-md border border-gray-200">
                            {files.length} Files
                        </span>
                    </div>
                    
                    <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto custom-scrollbar">
                        {files.map((file, idx) => {
                            const result = uploadResults.find(r => r.filename === file.name);
                            const isSuccess = result && !result.error;
                            const isError = result && result.error;
                            const isPending = !result && (status === 'uploading' || status === 'analyzing');

                            return (
                                <div key={idx} className="px-8 py-4 flex items-center justify-between hover:bg-gray-50/80 transition-colors group">
                                    <div className="flex items-center gap-4 overflow-hidden">
                                        <div className={`p-3 rounded-xl shrink-0 ${
                                            isError ? 'bg-rose-50 text-rose-600' : 
                                            isSuccess ? 'bg-emerald-50 text-emerald-600' : 
                                            'bg-indigo-50 text-indigo-600'
                                        }`}>
                                            {isError ? <FileWarning className="w-5 h-5" /> : 
                                             isSuccess ? <FileCheck className="w-5 h-5" /> : 
                                             <FileText className="w-5 h-5" />}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-gray-900 truncate max-w-[200px] sm:max-w-xs">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-gray-500 font-medium">
                                                {(file.size / 1024).toFixed(0)} KB
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        {isPending && (
                                            <div className="flex items-center gap-2 text-indigo-600">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span className="text-xs font-bold">Processing</span>
                                            </div>
                                        )}
                                        {isSuccess && (
                                            <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                                <CheckCircle2 className="w-4 h-4" />
                                                <span className="text-xs font-bold">Parsed</span>
                                            </div>
                                        )}
                                        {isError && (
                                            <div className="flex items-center gap-2 text-rose-600 bg-rose-50 px-3 py-1 rounded-full" title={result.error}>
                                                <X className="w-4 h-4" />
                                                <span className="text-xs font-bold">Failed</span>
                                            </div>
                                        )}
                                        {!result && status === 'idle' && (
                                            <span className="text-xs font-medium text-gray-400">Ready</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
             )}
        </div>
    </div>
  );
};

export default ResumeUpload;
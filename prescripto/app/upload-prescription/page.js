"use client"
import { useState } from 'react';
import { Upload, FileText, ArrowLeft, Loader2 } from 'lucide-react';
import PrescriptionResults from '@/components/landing/prescription/PrescriptionResults';

const UploadPrescription = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (validateFile(file)) {
                setSelectedFile(file);
                setError(null);
            }
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (validateFile(file)) {
                setSelectedFile(file);
                setError(null);
            }
        }
    };

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp', 'image/tiff', 'application/pdf'];
        const maxSize = 10 * 1024 * 1024;

        if (!validTypes.includes(file.type)) {
            setError('Please upload a valid image (JPG, PNG, BMP, TIFF) or PDF file');
            return false;
        }

        if (file.size > maxSize) {
            setError('File size must be less than 10MB');
            return false;
        }

        return true;
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch('http://localhost:5000/api/extract-prescription', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to process prescription');
            }

            const data = await response.json();
            setResults(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while processing the prescription');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setResults(null);
        setError(null);
    };

    if (results) {
        return <PrescriptionResults results={results} onReset={handleReset} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to Home</span>
                </button>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
                        Upload Prescription
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Upload your medical prescription and our AI will extract medicines, dosages, and frequencies accurately
                    </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12">
                    <div
                        className={`relative border-3 border-dashed rounded-xl p-12 transition-all duration-300 ${dragActive
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/50'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            accept="image/jpeg,image/jpg,image/png,image/bmp,image/tiff,application/pdf"
                            onChange={handleFileChange}
                        />

                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                                    <Upload className="w-12 h-12 text-white" />
                                </div>
                            </div>

                            {!selectedFile ? (
                                <>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                        Drop your prescription here
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        or click to browse from your device
                                    </p>
                                    <label
                                        htmlFor="file-upload"
                                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:scale-105"
                                    >
                                        Choose File
                                    </label>
                                    <p className="text-sm text-gray-500 mt-4">
                                        Supported formats: JPG, PNG, BMP, TIFF, PDF (Max 10MB)
                                    </p>
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-center gap-3 text-green-600">
                                        <FileText className="w-8 h-8" />
                                        <div className="text-left">
                                            <p className="font-semibold text-lg">{selectedFile.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={handleUpload}
                                            disabled={loading}
                                            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                'Analyze Prescription'
                                            )}
                                        </button>
                                        <button
                                            onClick={handleReset}
                                            disabled={loading}
                                            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 font-medium">{error}</p>
                        </div>
                    )}

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-blue-50 rounded-lg">
                            <div className="text-3xl font-bold text-blue-600 mb-2">Step 1</div>
                            <p className="text-gray-700">Upload prescription image or PDF</p>
                        </div>
                        <div className="text-center p-6 bg-cyan-50 rounded-lg">
                            <div className="text-3xl font-bold text-cyan-600 mb-2">Step 2</div>
                            <p className="text-gray-700">AI extracts information using OCR</p>
                        </div>
                        <div className="text-center p-6 bg-teal-50 rounded-lg">
                            <div className="text-3xl font-bold text-teal-600 mb-2">Step 3</div>
                            <p className="text-gray-700">View structured medicine details</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadPrescription;
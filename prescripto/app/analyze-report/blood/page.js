'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Upload, Droplet, AlertCircle, CheckCircle, Loader, 
  User, Calendar, Activity, TrendingUp, TrendingDown, Minus,
  AlertTriangle, Heart, FileText, Download, Share2, Info
} from 'lucide-react';
import Link from 'next/link';

export default function BloodReportPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const selectedFile = files[0];
      if (['application/pdf', 'image/jpeg', 'image/png', 'image/tiff'].includes(selectedFile.type)) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Please upload a PDF or image file (JPEG, PNG, TIFF)');
      }
    }
  };

  const handleFileChange = (e) => {
    const files = e.currentTarget.files;
    if (files && files[0]) {
      const selectedFile = files[0];
      if (['application/pdf', 'image/jpeg', 'image/png', 'image/tiff'].includes(selectedFile.type)) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Please upload a PDF or image file (JPEG, PNG, TIFF)');
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch('/api/analyze-blood-report', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze report');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'High':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'Low':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Borderline':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Normal':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'High':
        return <TrendingUp className="w-5 h-5" />;
      case 'Low':
        return <TrendingDown className="w-5 h-5" />;
      case 'Borderline':
        return <Minus className="w-5 h-5" />;
      case 'Normal':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status) => {
    const colorClass = getStatusColor(status);
    const icon = getStatusIcon(status);
    
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${colorClass} font-semibold text-sm`}>
        {icon}
        <span>{status}</span>
      </div>
    );
  };

  const calculateStats = () => {
    if (!result || !result.blood_parameters) return { total: 0, high: 0, low: 0, normal: 0, borderline: 0 };
    
    const params = Object.values(result.blood_parameters);
    return {
      total: params.length,
      high: params.filter(p => p.status === 'High').length,
      low: params.filter(p => p.status === 'Low').length,
      normal: params.filter(p => p.status === 'Normal').length,
      borderline: params.filter(p => p.status === 'Borderline').length,
    };
  };

  const stats = result ? calculateStats() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/analyze-report"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to Report Selection
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 backdrop-blur-sm rounded-full border border-red-400/30 mb-6"
          >
            <Droplet className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-900">Blood Report Analysis</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Upload Your{' '}
            <span className="bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
              Blood Report
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Upload your blood test report and get instant AI-powered analysis with detailed insights
          </motion.p>
        </motion.div>

        {!result ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8 max-w-3xl mx-auto"
          >
            <motion.div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              animate={{
                borderColor: dragActive ? '#dc2626' : '#e5e7eb',
                backgroundColor: dragActive ? 'rgba(254, 242, 242, 0.5)' : 'rgba(255, 255, 255, 0.8)',
              }}
              className="border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer bg-white/80 backdrop-blur-sm shadow-lg"
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.tiff"
                className="hidden"
                id="file-input"
                disabled={loading}
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <motion.div
                  animate={{ scale: dragActive ? 1.1 : 1 }}
                  className="flex flex-col items-center justify-center"
                >
                  <motion.div
                    animate={{ 
                      y: dragActive ? -10 : 0,
                      rotate: dragActive ? 5 : 0
                    }}
                    className="mb-6"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Upload className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {file ? file.name : 'Drop your report here'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {file ? 'Click to change file' : 'or click to browse from your device'}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      PDF
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      JPEG
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      PNG
                    </span>
                  </div>
                </motion.div>
              </label>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg flex items-start gap-3 shadow-sm"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Loader className="w-6 h-6 animate-spin text-red-600" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Analyzing your report...</p>
                    <p className="text-sm text-gray-600">Extracting blood parameters and generating insights</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    className="h-full bg-gradient-to-r from-red-500 to-rose-600"
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: file && !loading ? 1.02 : 1 }}
              whileTap={{ scale: file && !loading ? 0.98 : 1 }}
              onClick={handleAnalyze}
              disabled={!file || loading}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                file && !loading
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Activity className="w-5 h-5" />
                  Analyze Blood Report
                </>
              )}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Header Actions */}
            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setResult(null);
                  setFile(null);
                }}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium group"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                Analyze New Report
              </motion.button>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-white transition-all flex items-center gap-2 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Download
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-white transition-all flex items-center gap-2 shadow-sm"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </motion.button>
              </div>
            </div>

            {/* Stats Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-5 gap-4"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm font-medium">Total</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-green-50 backdrop-blur-sm rounded-xl p-4 border border-green-200 shadow-sm">
                <div className="flex items-center gap-2 text-green-600 mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Normal</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{stats.normal}</p>
              </div>
              <div className="bg-red-50 backdrop-blur-sm rounded-xl p-4 border border-red-200 shadow-sm">
                <div className="flex items-center gap-2 text-red-600 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">High</span>
                </div>
                <p className="text-2xl font-bold text-red-600">{stats.high}</p>
              </div>
              <div className="bg-orange-50 backdrop-blur-sm rounded-xl p-4 border border-orange-200 shadow-sm">
                <div className="flex items-center gap-2 text-orange-600 mb-1">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm font-medium">Low</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">{stats.low}</p>
              </div>
              <div className="bg-yellow-50 backdrop-blur-sm rounded-xl p-4 border border-yellow-200 shadow-sm">
                <div className="flex items-center gap-2 text-yellow-600 mb-1">
                  <Minus className="w-4 h-4" />
                  <span className="text-sm font-medium">Borderline</span>
                </div>
                <p className="text-2xl font-bold text-yellow-600">{stats.borderline}</p>
              </div>
            </motion.div>

            {/* Patient Information */}
            {result.patient_info && Object.keys(result.patient_info).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Patient Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(result.patient_info).map(([key, value]) => (
                    <div key={key} className="bg-blue-50/50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 capitalize mb-1 flex items-center gap-2">
                        {key === 'name' && <User className="w-4 h-4" />}
                        {key === 'age' && <Calendar className="w-4 h-4" />}
                        {key === 'sex' && <Activity className="w-4 h-4" />}
                        {key}
                      </p>
                      <p className="font-semibold text-gray-900 text-lg">{value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* AI Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-gradient-to-br from-red-50 to-rose-50 backdrop-blur-sm rounded-2xl p-6 border border-red-200 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">AI-Powered Summary</h3>
              </div>
              <p className="text-gray-800 leading-relaxed text-lg">{result.human_summary}</p>
            </motion.div>

            {/* Key Findings / Suggestions */}
            {result.suggestions && result.suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Key Findings & Recommendations</h3>
                </div>
                <div className="space-y-3">
                  {result.suggestions.map((suggestion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="flex items-start gap-3 p-4 bg-amber-50/50 border-l-4 border-amber-500 rounded-lg"
                    >
                      <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 leading-relaxed">{suggestion}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Blood Parameters Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Detailed Blood Parameters</h3>
              </div>
              
              <div className="overflow-x-auto">
                <div className="grid gap-4">
                  {Object.entries(result.blood_parameters).map(([param, data], index) => (
                    <motion.div
                      key={param}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.02 }}
                      className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-lg mb-1">{param}</h4>
                          <p className="text-sm text-gray-600">Reference: {data.reference_range}</p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">{data.value}</p>
                          </div>
                          <div>
                            {getStatusBadge(data.status)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center"
            >
              <p className="text-sm text-blue-800">
                <strong>Medical Disclaimer:</strong> This analysis is for informational purposes only and should not replace professional medical advice. 
                Please consult with your healthcare provider for proper diagnosis and treatment.
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
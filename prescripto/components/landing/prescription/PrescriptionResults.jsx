import { ArrowLeft, Download, Pill, Clock, User, Calendar, FileText, CheckCircle } from 'lucide-react';

const PrescriptionResults = ({ results, onReset }) => {
  const structuredInfo = results.structured_info || {};
  const medicinesSection = structuredInfo.medicines_section || '';

  const parseMedicines = (text) => {
    if (!text) return [];
    
    const lines = text.split('\n').filter(line => line.trim());
    const medicines = [];

    lines.forEach(line => {
      if (line.trim()) {
        const medicine = { raw: line };
        
        const tabMatch = line.match(/^(.+?)\s+(\d+(?:\.\d+)?)\s*(?:mg|mcg|gm|ml|tab|cap)?\s*(.*)$/i);
        if (tabMatch) {
          medicine.name = tabMatch[1].trim();
          medicine.dosage = tabMatch[2].trim();
          medicine.frequency = tabMatch[3].trim();
        } else {
          medicine.name = line.trim();
        }
        
        medicines.push(medicine);
      }
    });

    return medicines;
  };

  const medicines = parseMedicines(medicinesSection);

  const handleDownload = () => {
    const content = JSON.stringify(results, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prescription-analysis.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Upload Another</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            <Download className="w-5 h-5" />
            Download Results
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-green-50 border-2 border-green-200 rounded-full px-6 py-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span className="text-green-800 font-semibold text-lg">Analysis Complete</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Prescription Analysis
          </h1>
          <p className="text-gray-600">Here's what we extracted from your prescription</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {structuredInfo.patient_name && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Patient Name</h3>
              </div>
              <p className="text-xl font-semibold text-gray-900">{structuredInfo.patient_name}</p>
            </div>
          )}

          {structuredInfo.date && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Date</h3>
              </div>
              <p className="text-xl font-semibold text-gray-900">{structuredInfo.date}</p>
            </div>
          )}

          {structuredInfo.doctor_name && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Doctor</h3>
              </div>
              <p className="text-xl font-semibold text-gray-900">{structuredInfo.doctor_name}</p>
            </div>
          )}
        </div>

        {structuredInfo.diagnosis && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-8 mb-8 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              Diagnosis
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">{structuredInfo.diagnosis}</p>
          </div>
        )}

        {medicines.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-8 mb-8 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <Pill className="w-6 h-6 text-white" />
              </div>
              Prescribed Medicines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {medicines.map((medicine, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      <Pill className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">
                        {medicine.name || 'Medicine'}
                      </h3>
                      {medicine.dosage && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">Dosage:</span>
                          <span className="text-sm font-semibold text-gray-900">{medicine.dosage}</span>
                        </div>
                      )}
                      {medicine.frequency && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Frequency:</span>
                          <span className="text-sm font-semibold text-gray-900">{medicine.frequency}</span>
                        </div>
                      )}
                      {!medicine.dosage && !medicine.frequency && medicine.raw && (
                        <p className="text-sm text-gray-600">{medicine.raw}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {structuredInfo.instructions && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-8 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              Instructions
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">{structuredInfo.instructions}</p>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Note</h3>
          <p className="text-blue-800">
            This analysis is provided for informational purposes only. Always consult with your healthcare provider
            or pharmacist if you have questions about your prescription or medications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionResults;
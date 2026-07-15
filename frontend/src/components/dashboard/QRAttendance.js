import React, { useState, useEffect } from 'react';

const QRAttendance = ({ subject }) => {
  const [qrCode, setQrCode] = useState('');
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [scanResult, setScanResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [mode, setMode] = useState('generate'); // 'generate' | 'scan'
  const [showScanner, setShowScanner] = useState(false);

  const textClass = "text-gray-800 dark:text-gray-100";
  const subtextClass = "text-gray-500 dark:text-gray-400";
  const cardClass = "bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5";

  // Generate QR code (simulated)
  const generateQR = () => {
    const code = `${subject}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setQrCode(code);
    setTimeLeft(60);
    
    // Get geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setLocation({ lat: 12.9716, lng: 77.5946 }) // Default: Bengaluru
      );
    }

    // Auto-regenerate every 60 seconds
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          generateQR();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  };

  // Simulate QR scan
  const simulateScan = () => {
    setScanResult({
      success: true,
      student: { name: 'Ananya Sharma', roll: '2021CSE045' },
      time: new Date().toLocaleTimeString(),
      location: 'CS-101 (within range)',
    });
  };

  useEffect(() => {
    if (mode === 'generate') generateQR();
  }, [mode]);

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button onClick={() => setMode('generate')} className={`flex-1 py-2 rounded-md text-sm font-medium transition ${mode === 'generate' ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>
          👨‍🏫 Generate QR
        </button>
        <button onClick={() => setMode('scan')} className={`flex-1 py-2 rounded-md text-sm font-medium transition ${mode === 'scan' ? 'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>
          📱 Scan QR
        </button>
      </div>

      {mode === 'generate' && (
        <div className={cardClass}>
          <h3 className={`font-semibold ${textClass} mb-4`}>📋 QR Code for Attendance</h3>
          <p className={`text-sm ${subtextClass} mb-4`}>Subject: {subject} | Valid for: <span className="font-bold text-blue-600">{timeLeft}s</span></p>
          
          {/* Simulated QR Code */}
          <div className="bg-white border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 mb-4 flex flex-col items-center">
            <div className="w-48 h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-2">
              <div className="text-center">
                <span className="text-6xl">📱</span>
                <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">QR Code Display</p>
              </div>
            </div>
            <p className={`text-xs ${subtextClass} break-all text-center mt-2`}>{qrCode}</p>
          </div>

          <div className="flex space-x-2 mb-4">
            <button onClick={generateQR} className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
              🔄 Regenerate
            </button>
            <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium">
              📥 Download QR
            </button>
          </div>

          {location.lat && (
            <div className={`p-3 ${textClass === 'text-gray-800 dark:text-gray-100' ? 'bg-gray-50 dark:bg-gray-700/50' : ''} rounded-lg`}>
              <p className={`text-xs ${subtextClass}`}>📍 Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)} (Within campus: ✅)</p>
            </div>
          )}
        </div>
      )}

      {mode === 'scan' && (
        <div className={cardClass}>
          <h3 className={`font-semibold ${textClass} mb-4`}>📱 Scan Attendance QR</h3>
          
          {!scanResult ? (
            <div className="text-center py-8">
              <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">📷</span>
              </div>
              <p className={`text-sm ${textClass} mb-4`}>Point camera at the QR code displayed by faculty</p>
              <button onClick={simulateScan} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
                📸 Simulate Scan
              </button>
              <p className={`text-xs ${subtextClass} mt-2`}>In production: Uses device camera</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✅</span>
              </div>
              <h3 className={`font-bold text-lg ${textClass}`}>Attendance Marked!</h3>
              <div className={`mt-4 space-y-2 text-sm`}>
                <p className={textClass}><strong>Student:</strong> {scanResult.student.name} ({scanResult.student.roll})</p>
                <p className={textClass}><strong>Time:</strong> {scanResult.time}</p>
                <p className={textClass}><strong>Location:</strong> {scanResult.location}</p>
                <p className="text-green-600 dark:text-green-400 font-medium mt-2">✅ Within geofence | Attendance recorded</p>
              </div>
              <button onClick={() => setScanResult(null)} className="mt-4 px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                Scan Another
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QRAttendance;

import React, { useState, useEffect } from 'react';
import { statsAPI } from '../services/api';
import { DashboardStats } from '../types';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await statsAPI.getDashboard();
        setStats(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center text-red-600">Erreur de chargement des données</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de Bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Services</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalServices}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Avis</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalAvis}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Utilisateurs</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.totalUsers}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Score Moyen</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.averageScore.toFixed(1)}/5</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Avis Récents</h2>
        <div className="space-y-4">
          {stats.recentAvis.map((avis) => (
            <div key={avis.id} className="border-l-4 border-blue-500 pl-4">
              <p className="font-medium">{avis.service?.name}</p>
              <p className="text-gray-600 text-sm">{avis.comment}</p>
              <div className="flex space-x-2 mt-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  Accueil: {avis.ratingAccueil}/5
                </span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  Délai: {avis.ratingDelai}/5
                </span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  Résolution: {avis.ratingResolution}/5
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
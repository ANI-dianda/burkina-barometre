import React, { useState, useEffect } from 'react';
import { servicesAPI } from '../services/api';
import { Service } from '../types';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesAPI.getAll();
        setServices(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Services Publics</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Rechercher un service..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="ml-1 text-sm font-medium">{service.currentScore.toFixed(1)}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Type:</span> {service.type}
            </p>
            
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Adresse:</span> {service.address}
            </p>
            
            {service.administration && (
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Administration:</span> {service.administration.name}
              </p>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {service.avis?.length || 0} avis
              </span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Voir détails
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun service trouvé</p>
        </div>
      )}
    </div>
  );
};

export default Services;

import React from 'react';
import { Camera, Wifi, WifiOff, Play, Pause } from 'lucide-react';

const Monitoring = () => {
  const cameras = [
    { id: 1, name: 'Entrada Principal', status: 'online', zone: 'Zona A', lastUpdate: '14:35' },
    { id: 2, name: 'Estacionamento Norte', status: 'online', zone: 'Zona B', lastUpdate: '14:35' },
    { id: 3, name: 'Corredor Principal', status: 'offline', zone: 'Zona A', lastUpdate: '13:45' },
    { id: 4, name: 'Sala de Servidores', status: 'online', zone: 'Zona C', lastUpdate: '14:35' },
    { id: 5, name: 'Perímetro Leste', status: 'online', zone: 'Zona D', lastUpdate: '14:34' },
    { id: 6, name: 'Recepção', status: 'recording', zone: 'Zona A', lastUpdate: '14:35' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-red-600 bg-red-100';
      case 'recording': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Wifi className="h-4 w-4" />;
      case 'offline': return <WifiOff className="h-4 w-4" />;
      case 'recording': return <Play className="h-4 w-4" />;
      default: return <Pause className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Centro de Monitoramento</h1>
          <p className="text-muted-foreground">Controle e visualização de câmeras de segurança</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">5 Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">1 Offline</span>
          </div>
        </div>
      </div>

      {/* Grid principal de câmeras */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Visualização principal */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Câmera Principal</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
                <span className="text-sm text-muted-foreground">Ao vivo</span>
              </div>
            </div>
            
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm opacity-75">Entrada Principal - Câmera 001</p>
                <p className="text-xs opacity-50 mt-1">Feed ao vivo ativo</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  <Play className="h-4 w-4 mr-2 inline" />
                  Reproduzir
                </button>
                <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors">
                  Capturar
                </button>
              </div>
              <div className="text-sm text-muted-foreground">
                Resolução: 1920x1080 • FPS: 30
              </div>
            </div>
          </div>
        </div>

        {/* Lista de câmeras */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Todas as Câmeras</h3>
          
          {cameras.map((camera) => (
            <div key={camera.id} className="bg-card rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground">{camera.name}</h4>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(camera.status)}`}>
                  {getStatusIcon(camera.status)}
                  <span className="capitalize">{camera.status}</span>
                </div>
              </div>
              
              <div className="aspect-video bg-gray-800 rounded mb-3 flex items-center justify-center">
                <Camera className="h-6 w-6 text-gray-500" />
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{camera.zone}</span>
                <span>{camera.lastUpdate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles de monitoramento */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Controles de Monitoramento</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-secondary rounded-lg p-4">
            <h4 className="font-medium text-secondary-foreground mb-2">Gravação Automática</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Ativada</span>
              <div className="w-10 h-6 bg-green-500 rounded-full p-1">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary rounded-lg p-4">
            <h4 className="font-medium text-secondary-foreground mb-2">Detecção de Movimento</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Ativada</span>
              <div className="w-10 h-6 bg-green-500 rounded-full p-1">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary rounded-lg p-4">
            <h4 className="font-medium text-secondary-foreground mb-2">Visão Noturna</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Auto</span>
              <div className="w-10 h-6 bg-blue-500 rounded-full p-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary rounded-lg p-4">
            <h4 className="font-medium text-secondary-foreground mb-2">Alertas</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Ativados</span>
              <div className="w-10 h-6 bg-green-500 rounded-full p-1">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;

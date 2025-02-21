import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, User } from 'lucide-react';

const PatientManagementSystem = () => {
  const [currentScreen, setCurrentScreen] = useState('select'); // select, overview, initial, final
  const [expandedSection, setExpandedSection] = useState(null);

  const patients = [
    {
      id: '110340-0111',
      name: 'Testborger4011 Efternavnborger4011',
      conditions: 'Demens, Kronisk obstruktiv lungesygdom',
      address: 'Randersvej 94, 1400 København K'
    },
    {
      id: '110340-0104',
      name: 'Testborger4004 Efternavnborger4004',
      conditions: 'Depression, Type 1-diabetes',
      address: 'Randersvej 94, 1400 København K'
    }
  ];

  const initialHealthConditions = [
    {
      name: 'Problemer med mave og tarm',
      details: 'Her tendens til forstoppelse'
    },
    {
      name: 'Kroniske smerter',
      details: 'Har daglig mange smerter grundet gigt. Mest udtalt i knæ. Smertelindring med paracetamol 1g x 4 dagligt.'
    },
    {
      name: 'Emotionelle problemer',
      details: null
    },
    {
      name: 'Cirkulationsproblemer',
      details: null
    },
    {
      name: 'Diabetes Type 1',
      details: {
        diagnosisYear: '1995',
        treatmentType: 'Insulinkrævende',
        lastHbA1c: '58 mmol/mol (August 2024)',
        measurementFrequency: '4 gange dagligt',
        equipment: 'CGM (continuous glucose monitoring)',
        followUp: [
          'Diabetesambulatoriet hver 3. måned',
          'Regelmæssige øjenundersøgelser',
          'Fast tilknyttet fodterapeut'
        ],
        treatmentPlan: [
          'Diætist-udarbejdet kostplan',
          'Systematisk kulhydrattælling',
          'Tilpasset motionsplan'
        ],
        focusAreas: [
          'Blodsukkereregulering ifm. motion',
          'Kostjustering ved træning',
          'Forebyggelse af hypoglykæmi'
        ]
      }
    }
  ];

  const finalHealthConditions = [
    {
      name: 'Problemer med mave og tarm',
      details: 'Her tendens til forstoppelse'
    },
    {
      name: 'Kroniske smerter',
      details: 'Har daglig mange smerter grundet gigt. Mest udtalt i knæ og hænder. Smertelindring med paracetamol 1g x 4 dagligt. Ved behov suppleres med ibuprofen 400mg. Mest smerter om morgenen. Oplever bedring ved bevægelse. Deltager i smertehåndteringskursus. Har prøvet forskellige non-farmakologiske tiltag som varme og kulde. Fysioterapeut har udarbejdet øvelsesprogram.',
      changed: true
    },
    {
      name: 'Emotionelle problemer',
      details: 'Depression diagnosticeret',
      changed: true
    },
    {
      name: 'Cirkulationsproblemer',
      details: null
    },
    {
      name: 'Diabetes Type 1',
      details: {
        diagnosisYear: '1995',
        treatmentType: 'Insulinkrævende',
        lastHbA1c: '58 mmol/mol (August 2024)',
        measurementFrequency: '4 gange dagligt',
        equipment: 'CGM (continuous glucose monitoring)',
        followUp: [
          'Diabetesambulatoriet hver 3. måned',
          'Regelmæssige øjenundersøgelser',
          'Fast tilknyttet fodterapeut'
        ],
        treatmentPlan: [
          'Diætist-udarbejdet kostplan',
          'Systematisk kulhydrattælling',
          'Tilpasset motionsplan'
        ],
        focusAreas: [
          'Blodsukkereregulering ifm. motion',
          'Kostjustering ved træning',
          'Forebyggelse af hypoglykæmi'
        ]
      }
    }
  ];

  const PatientSelect = () => (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Søg efter patient..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
        />
      </div>
      <div className="mt-4 space-y-2">
        {patients.map((patient) => (
          <button
            key={patient.id}
            className="w-full p-4 bg-white rounded-lg shadow hover:bg-gray-50 text-left"
            onClick={() => setCurrentScreen('overview')}
          >
            <div className="flex items-start space-x-4">
              <User className="w-6 h-6 text-gray-400" />
              <div>
                <h3 className="font-medium">{patient.name}</h3>
                <p className="text-sm text-gray-600">ID: {patient.id}</p>
                <p className="text-sm text-gray-600">{patient.conditions}</p>
                <p className="text-sm text-gray-600">{patient.address}</p>
              </div>
              <ChevronRight className="ml-auto w-5 h-5 text-gray-400" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const Header = () => (
    <div className="bg-white border-b p-4">
      <div className="flex items-center space-x-4">
        <button 
          className="p-2 hover:bg-gray-100 rounded"
          onClick={() => {
            if (currentScreen === 'final') setCurrentScreen('initial');
            else if (currentScreen === 'initial') setCurrentScreen('overview');
            else setCurrentScreen('select');
          }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-lg font-semibold">{patients[0].name}</h2>
          <p className="text-sm text-gray-600">ID: {patients[0].id}</p>
        </div>
      </div>
      <div className="mt-4 flex space-x-6 border-b">
        <TabButton 
          label="Helbredstilstand"
          isActive={true}
        />
        <TabButton 
          label="Funktionsevne"
          isActive={false}
        />
        <TabButton 
          label="Ydelser"
          isActive={false}
        />
      </div>
    </div>
  );

  const TabButton = ({ label, isActive }) => (
    <button 
      className={`pb-2 px-1 ${isActive ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
    >
      {label}
    </button>
  );

  const ConditionItem = ({ condition, showChanges = false }) => (
    <div className={`border-b last:border-b-0 ${showChanges && condition.changed ? 'bg-yellow-50' : ''}`}>
      <button
        className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50"
        onClick={() => setExpandedSection(expandedSection === condition.name ? null : condition.name)}
      >
        <span>{condition.name}</span>
        <ChevronRight className={`w-5 h-5 transform transition-transform ${expandedSection === condition.name ? 'rotate-90' : ''}`} />
      </button>
      {expandedSection === condition.name && (
        <div className="p-4 bg-gray-50">
          {typeof condition.details === 'string' ? (
            <p>{condition.details}</p>
          ) : condition.details ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Diagnose år:</p>
                  <p>{condition.details.diagnosisYear}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Behandlingstype:</p>
                  <p>{condition.details.treatmentType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Seneste HbA1c:</p>
                  <p>{condition.details.lastHbA1c}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Målehyppighed:</p>
                  <p>{condition.details.measurementFrequency}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Opfølgning</h4>
                <ul className="list-disc list-inside space-y-1">
                  {condition.details.followUp.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Behandlingsplan</h4>
                <ul className="list-disc list-inside space-y-1">
                  {condition.details.treatmentPlan.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Aktuelle fokusområder</h4>
                <ul className="list-disc list-inside space-y-1">
                  {condition.details.focusAreas.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );

  const StateView = ({ showChanges = false }) => (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-lg">
        {(showChanges ? finalHealthConditions : initialHealthConditions).map((condition, index) => (
          <ConditionItem 
            key={index} 
            condition={condition}
            showChanges={showChanges}
          />
        ))}
      </div>
      {!showChanges ? (
        <button 
          className="mt-4 w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => setCurrentScreen('final')}
        >
          Vis ændringer
        </button>
      ) : (
        <button 
          className="mt-4 w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => setCurrentScreen('initial')}
        >
          Tilbage
        </button>
      )}
    </div>
  );

  const CitizenOverview = () => {
    const diabetesCondition = initialHealthConditions.find(c => c.name === 'Diabetes Type 1');
    const focusAreas = diabetesCondition?.details?.focusAreas || [];

    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <h3 className="text-xl font-medium mb-4">Patient Overblik</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Navn</p>
                  <p className="font-medium">{patients[0].name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">CPR</p>
                  <p className="font-medium">{patients[0].id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Adresse</p>
                  <p className="font-medium">{patients[0].address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Primære diagnoser</p>
                  <p className="font-medium">{patients[0].conditions}</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Patient Sammenfatning</h4>
                <p className="text-sm text-gray-600">
                  Testborger4011 er pensioneret murermester og bor sammen med sin hustru Cathrine i København.
                  Han har udfordringer med både demens og KOL, hvilket påvirker hans dagligdag på forskellige måder.
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Cathrine arbejder stadig og står for det meste af husholdningen, samtidig med at hun hjælper med
                  deres fem børnebørn. Hun yder betydelig støtte, blandt andet ved at ringe hjem for at minde ham om måltider.
                </p>
              </div>
              <div className="mt-6">
                <h4 className="font-medium mb-2">Aktuelle fokusområder</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {focusAreas.map((area, index) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>
              </div>
            </div>
            <button 
              className="mt-6 w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => setCurrentScreen('initial')}
            >
              Se detaljer
            </button>
          </div>
        </div>
      </div>
    );
  };

  const MainContent = () => {
    switch (currentScreen) {
      case 'select':
        return <PatientSelect />;
      case 'overview':
        return <CitizenOverview />;
      case 'initial':
        return <StateView showChanges={false} />;
      case 'final':
        return <StateView showChanges={true} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {currentScreen !== 'select' && <Header />}
      <MainContent />
    </div>
  );
};

export default PatientManagementSystem;
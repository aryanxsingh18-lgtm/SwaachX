// Centralized Application Data State Framework Matrix
        let reportsData = [
            { id: "REP-2026-01", category: "Dangerous / Toxic Liquids", coords: { x: 200, y: 150 }, urgency: "Critical", status: "Truck Dispatched", votes: 24, description: "Leaking liquid pool found on back alley pathway." },
            { id: "REP-2026-02", category: "Overfilled Public Bin", coords: { x: 450, y: 300 }, urgency: "Standard", status: "Waiting", votes: 4, description: "Plastic bottles piling up on sidewalk corner." },
            { id: "REP-2026-03", category: "Illegal Street Dumping", coords: { x: 650, y: 200 }, urgency: "Elevated", status: "Cleaned Up", votes: 11, description: "Old couch left on side of bypass lane road." }
        ];

        let fleetVehicles = [
            { id: "TRUCK-01", driver: "John Doe", type: "Food Waste Truck", efficiency: "Good", load: "74%", coords: { x: 100, y: 150 }, status: "En Route" },
            { id: "TRUCK-02", driver: "Sarah Jenkins", type: "Recycling Truck", efficiency: "Best Path", load: "38%", coords: { x: 450, y: 100 }, status: "En Route" },
            { id: "TRUCK-03", driver: "David Chen", type: "Hazard Truck", efficiency: "Standby", load: "0%", coords: { x: 650, y: 350 }, status: "Idle at Depot" }
        ];

        let currentActiveTab = 'overview';
        let currentFilterMode = 'All';


        // Initialize UI Elements Matrix On Initialization Launch
        window.onload = function() {
            renderCitizenReportsTable();
            renderFleetTelemetryGrid();
            renderMapReportsLayerMarkers();
            animateMockVehicleTelemetry();
        };

        // Tab Switching Mechanism Logic
        function switchTab(targetTabId) {
            currentActiveTab = targetTabId;
            
            // Hide all tab components panels
            document.querySelectorAll('.tab-content').forEach(element => {
                element.classList.add('hidden');
            });
            
            // Unveil targeted view container structure
            document.getElementById(`tab-${targetTabId}`).classList.remove('hidden');


            // Reset navigation tab button design system states
            document.querySelectorAll('aside nav button').forEach(button => {
                button.className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all text-slate-400 hover:bg-slate-900 hover:text-slate-100";
            });

            // Accentuate selected execution option button
            const activeNavButton = document.getElementById(`nav-${targetTabId}`);
            if (activeNavButton) {
                activeNavButton.className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/10";
            }
        }

        // Action Notifications Component Trigger Handlers
        function triggerNotification(messageText) {
            const container = document.getElementById('action-notification');
            const textbox = document.getElementById('notification-text');
            textbox.innerText = messageText;
            container.classList.remove('hidden');
            

            // Auto close wrapper after time frame lapse sequence
            setTimeout(() => {
                closeNotification();
            }, 6000);
        }

        function closeNotification() {
            document.getElementById('action-notification').classList.add('hidden');
        }

        // Render Incident Tables Array Context Elements
        function renderCitizenReportsTable() {
            const tableBody = document.getElementById('citizen-reports-tbody');
            tableBody.innerHTML = '';

            const filteredData = reportsData.filter(item => {
                if (currentFilterMode === 'All') return true;
                if (currentFilterMode === 'Critical' && item.urgency === 'Critical') return true;
                if (currentFilterMode === 'Standard' && item.urgency === 'Standard') return true;

                return false;
            });

            filteredData.forEach(report => {
                let urgencyBadgeClass = 'bg-slate-900 text-slate-400 border border-slate-800';
                if (report.urgency === 'Critical') urgencyBadgeClass = 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
                if (report.urgency === 'Elevated') urgencyBadgeClass = 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
                if (report.urgency === 'Standard') urgencyBadgeClass = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';

                let statusBadgeClass = 'text-slate-400';
                if (report.status === 'Cleaned Up') statusBadgeClass = 'text-emerald-400 font-medium';
                if (report.status === 'Truck Dispatched') statusBadgeClass = 'text-cyan-400 font-medium';
                if (report.status === 'Waiting') statusBadgeClass = 'text-amber-500 font-medium';

                const tr = document.createElement('tr');
                tr.className = 'hover:bg-slate-950/40 transition-colors group';
                tr.innerHTML = `
                    <td class="py-4 pl-2 font-mono text-xs text-slate-400 group-hover:text-white transition-colors">${report.id}</td>
                    <td class="py-4 font-semibold text-white">

                        <div>${report.category}</div>
                        <div class="text-[11px] text-slate-500 font-normal mt-0.5 whitespace-normal max-w-sm">${report.description}</div>
                    </td>
                    <td class="py-4 font-mono text-xs text-slate-400">[X: ${report.coords.x}, Y: ${report.coords.y}]</td>
                    <td class="py-4"><span class="px-2.5 py-1 rounded-full text-xs font-medium ${urgencyBadgeClass}">${report.urgency === 'Critical' ? 'Urgent' : (report.urgency === 'Elevated' ? 'Medium' : 'Normal')}</span></td>
                    <td class="py-4 text-xs"><span class="flex items-center gap-1.5 ${statusBadgeClass}">${report.status}</span></td>
                    <td class="py-4 text-right pr-2">
                        <button onclick="upvoteIncident('${report.id}')" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 rounded-xl transition-all text-xs font-medium text-slate-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 text-emerald-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                            </svg>
                            Upvote (${report.votes})
                        </button>
                    </td>
                `;
                tableBody.appendChild(tr);
            });

            // Keep global data counts dynamic tracking

            document.getElementById('stat-reports').innerText = reportsData.length;
        }

        // Filtering Actions Controllers logic
        function filterReports(urgencyMode) {
            currentFilterMode = urgencyMode;
            
            document.querySelectorAll('#filter-all, #filter-critical, #filter-standard').forEach(btn => {
                btn.className = "px-3 py-1.5 rounded-lg text-slate-400 font-medium hover:text-white";
            });

            const currentBtn = document.getElementById(`filter-${urgencyMode.toLowerCase()}`);
            if (currentBtn) {
                currentBtn.className = "px-3 py-1.5 rounded-lg bg-slate-800 text-white font-medium";
            }

            renderCitizenReportsTable();
        }


        // Community Upvoting Logic Mutation
        function upvoteIncident(reportId) {
            const match = reportsData.find(item => item.id === reportId);
            if (match) {
                match.votes++;
                renderCitizenReportsTable();
                triggerNotification(`Report ${reportId} has been confirmed by another person.`);
            }
        }

        // Form Submission Handling
        function handleReportSubmit(event) {
            event.preventDefault();
            
            const categoryValue = document.getElementById('form-category').value;
            const xVal = parseInt(document.getElementById('form-coord-x').value);
            const yVal = parseInt(document.getElementById('form-coord-y').value);
            const notesValue = document.getElementById('form-notes').value || "No extra notes details provided.";
            

            const urgencyRadio = document.querySelector('input[name="form-urgency"]:checked');
            const urgencyValue = urgencyRadio ? urgencyRadio.value : "Standard";

            const generatedId = `REP-2026-0${reportsData.length + 1}`;

            const newIncidentObj = {
                id: generatedId,
                category: categoryValue,
                coords: { x: xVal, y: yVal },
                urgency: urgencyValue,
                status: "Waiting",
                votes: 1,
                description: notesValue
            };

            reportsData.unshift(newIncidentObj);

            renderCitizenReportsTable();
            renderMapReportsLayerMarkers();

            
            document.getElementById('form-notes').value = '';
            
            triggerNotification(`Added new trash report tag: ${generatedId}`);
            switchTab('citizen');
        }

        // Render Map Markers
        function renderMapReportsLayerMarkers() {
            const reportsLayerGroup = document.getElementById('map-reports-layer');
            reportsLayerGroup.innerHTML = '';

            reportsData.forEach(report => {
                let markerColor = '#10b981'; // Normal
                if (report.urgency === 'Critical') markerColor = '#ef4444';
                if (report.urgency === 'Elevated') markerColor = '#f59e0b';

                const gMarker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                gMarker.setAttribute('transform', `translate(${report.coords.x}, ${report.coords.y})`);

                gMarker.className.baseVal = 'cursor-pointer';
                gMarker.onclick = function() {
                    triggerNotification(`Report: [${report.id}] ${report.category} - Status: ${report.status}`);
                };

                gMarker.innerHTML = `
                    <circle r="8" fill="${markerColor}" opacity="0.3" class="pulse-dot" />
                    <circle r="4" fill="${markerColor}" stroke="#0f172a" stroke-width="1" />
                `;
                reportsLayerGroup.appendChild(gMarker);
            });
        }

        // Fleet Telemetry Component Layout Builder Engine Modules
        function renderFleetTelemetryGrid() {
            const fleetGrid = document.getElementById('fleet-telemetry-grid');
            fleetGrid.innerHTML = '';

            fleetVehicles.forEach(vehicle => {

                let badgeColor = 'bg-slate-900 text-slate-400 border border-slate-800';
                if (vehicle.status === 'En Route') badgeColor = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
                if (vehicle.status === 'Idle at Depot') badgeColor = 'bg-amber-500/10 text-amber-400 border border-amber-500/20';

                const card = document.createElement('div');
                card.className = 'bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between';
                card.innerHTML = `
                    <div>
                        <div class="flex items-center justify-between gap-4 mb-3">
                            <div class="flex items-center gap-2.5">
                                <div class="w-2.5 h-2.5 bg-slate-800 rounded-full flex items-center justify-center ${vehicle.id === 'TRUCK-01' ? 'bg-emerald-400' : (vehicle.id === 'TRUCK-02' ? 'bg-cyan-400' : 'bg-slate-500')}"></div>
                                <span class="text-sm font-bold text-white font-mono">${vehicle.id}</span>
                                <span class="text-xs text-slate-400">(${vehicle.type})</span>
                            </div>
                            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${badgeColor}">${vehicle.status}</span>
                        </div>
                        
                        <div class="space-y-1 text-xs text-slate-400 mt-4">
                            <div class="flex justify-between">Driver Name: <span class="text-white font-medium">${vehicle.driver}</span></div>

                            <div class="flex justify-between">How full is truck: <span class="text-white font-medium">${vehicle.load}</span></div>
                            <div class="flex justify-between">Current Map Spot: <span id="telemetry-coord-${vehicle.id}" class="text-cyan-400 font-mono font-medium">[X: ${vehicle.coords.x}, Y: ${vehicle.coords.y}]</span></div>
                            <div class="flex justify-between">Route Setting: <span class="text-emerald-400 font-medium">${vehicle.efficiency}</span></div>
                        </div>
                    </div>

                    <div class="mt-5 pt-4 border-t border-slate-850 flex gap-2">
                        <button onclick="pingVehicleTelemetry('${vehicle.id}')" class="flex-1 py-2 bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 hover:bg-slate-850 hover:border-slate-700 rounded-xl transition-all flex items-center justify-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5 text-cyan-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-8.24 0M13.5 12a3 3 0 01-4.24 0M12 21.75c-5.385 0-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z" />
                            </svg>
                            Test Connection
                        </button>
                    </div>
                `;
                fleetGrid.appendChild(card);
            });
        }


        // Diagnostic Ping Tool Implementation Logic Simulation
        function pingVehicleTelemetry(vehicleId) {
            triggerNotification(`Sending check signal to ${vehicleId}... Connection is working perfectly.`);
        }

        // Live Mock Tracking Coordinates Progression Engine Animation Loop
        function animateMockVehicleTelemetry() {
            setInterval(() => {
                let truck1 = fleetVehicles.find(v => v.id === 'TRUCK-01');
                if (truck1 && truck1.status === 'En Route') {
                    truck1.coords.x += (Math.random() > 0.5 ? 4 : -4);
                    if (truck1.coords.x > 700 || truck1.coords.x < 100) truck1.coords.x = 250;
                    
                    const element1 = document.getElementById('truck-asset-1');
                    if (element1) element1.setAttribute('transform', `translate(${truck1.coords.x}, ${truck1.coords.y})`);
                    
                    const textCoord1 = document.getElementById(`telemetry-coord-TRUCK-01`);
                    if (textCoord1) textCoord1.innerText = `[X: ${truck1.coords.x}, Y: ${truck1.coords.y}]`;
                }


                let truck2 = fleetVehicles.find(v => v.id === 'TRUCK-02');
                if (truck2 && truck2.status === 'En Route') {
                    truck2.coords.y += (Math.random() > 0.5 ? 3 : -3);
                    if (truck2.coords.y > 380 || truck2.coords.y < 80) truck2.coords.y = 150;

                    const element2 = document.getElementById('truck-asset-2');
                    if (element2) element2.setAttribute('transform', `translate(${truck2.coords.x}, ${truck2.coords.y})`);

                    const textCoord2 = document.getElementById(`telemetry-coord-TRUCK-02`);
                    if (textCoord2) textCoord2.innerText = `[X: ${truck2.coords.x}, Y: ${truck2.coords.y}]`;
                }
            }, 3000);
        }

        // AI Route Finder Calculation Simulation
        function runRouteOptimization() {
            const loaderContainer = document.getElementById('optimization-loader');
            const progressBar = document.getElementById('opt-progress-bar');
            const progressText = document.getElementById('opt-progress-text');

            
            loaderContainer.classList.remove('hidden');
            let counterProgressValue = 0;

            const trackingIntervalId = setInterval(() => {
                counterProgressValue += Math.floor(Math.random() * 15) + 5;
                if (counterProgressValue >= 100) {
                    counterProgressValue = 100;
                    clearInterval(trackingIntervalId);
                    
                    setTimeout(() => {
                        document.getElementById('opt-distance').innerText = "94.2 km";
                        document.getElementById('opt-fuel').innerText = "38.6 Liters";
                        document.getElementById('opt-carbon').innerText = "101.5 kg CO2";
                        document.getElementById('stat-efficiency').innerText = "33.6%";
                        
                        loaderContainer.classList.add('hidden');
                        triggerNotification("AI has finished finding the best routes. Fuel and time saved!");
                    }, 400);

                }
                progressBar.style.width = `${counterProgressValue}%`;
                progressText.innerText = `${counterProgressValue}%`;
            }, 150);
        }

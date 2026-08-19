// Central Application Memory Configuration Core States Models Records Data
        let appState = {
            activeRole: 'citizen',
            activeCitizenSubview: 'home',
            pointsScoreBalance: 1240,

            selectedStagedCategory: 'Plastic Overflow Pile',
            extractedStagedAddress: '',
            isNetworkOnline: true,
            offlineUploadReportQueue: [],
            addressesGeolocationsDataPool: [
                '122 Oak Street (Zone Route Fleet Delta)',
                '404 Maple Ave (Near Central Park Boundary Terminal)',
                '71 Pine Boulevard (Commercial Market Central Axis)'
            ],
            incidentsMainRegister: [
                { id: 201, category: 'Bio-Waste Overflow', address: '122 Oak Street', status: 'Pending', timeString: '1h ago', details: 'Overflowing trash receptacle corridor completely blocking pedestrian crossing grids safety arrays paths.', imgMarker: 'Bio+Waste' },
                { id: 202, category: 'Plastic Overflow Pile', address: '404 Maple Ave', status: 'Assigned', timeString: '2h ago', details: 'Recyclables accumulation cluster stacked against neighborhood green perimeter elements fencing fences.', imgMarker: 'Recycle+Bin' },
                { id: 203, category: 'E-Waste Dumping Cluster', address: '71 Pine Blvd', status: 'Collected', timeString: '4h ago', details: 'Cathode monitors and computer chassis frames discarded illegally outside loading docking bays entries.', imgMarker: 'Electronic' }
            ],
            rewardsCatalogData: [
                { id: 'rw-1', title: 'Free Municipal Transit Ticket', metricCost: 150, category: 'SDG 11 Benefit', icon: '🎫' },
                { id: 'rw-2', title: 'Local Green Café Discount Voucher', metricCost: 300, category: 'SDG 12 Benefit', icon: '☕' },
                { id: 'rw-3', title: 'Urban Reforestation: Plant 1 Tree', metricCost: 500, category: 'Carbon Credit Offset', icon: '🌲' }
            ]

        };

        // DOM Lifecycle Initialization Mounting Listeners Hooks Anchor Configurations
        window.addEventListener('DOMContentLoaded', () => {
            renderCitizenIncidentFeedDeck();
            renderRewardsMarketplaceCatalog();
            synchronizeOperationsDriverDashboardView();
        });

        // Global Platform Role-Access Switcher Engine Controller Router Handler
        function switchSystemRole(targetRole) {
            appState.activeRole = targetRole;
            
            const btnCitizenTab = document.getElementById('role-tab-citizen');
            const btnDriverTab = document.getElementById('role-tab-driver');
            const layerCitizenGroup = document.getElementById('view-citizen-group');
            const layerDriverGroup = document.getElementById('view-driver-group');
            
            // Terminate overlay layers to keep layouts boundaries secure pristine clean states

            toggleOpticalLens(false);

            if (targetRole === 'citizen') {
                btnCitizenTab.className = "px-3.5 py-1.5 rounded-full text-slate-900 bg-slate-100 shadow-md transition-all";
                btnDriverTab.className = "px-3.5 py-1.5 rounded-full text-slate-500 transition-all";
                layerCitizenGroup.classList.remove('hidden');
                layerDriverGroup.classList.add('hidden');
                renderCitizenIncidentFeedDeck();
            } else {
                btnDriverTab.className = "px-3.5 py-1.5 rounded-full text-slate-900 bg-slate-100 shadow-md transition-all";
                btnCitizenTab.className = "px-3.5 py-1.5 rounded-full text-slate-500 transition-all";
                layerDriverGroup.classList.remove('hidden');
                layerCitizenGroup.classList.add('hidden');
                synchronizeOperationsDriverDashboardView();
            }
        }

        // Citizen Core Nested Navigation Interface Controller Route Subview Switcher
        function navToCitizenSubview(targetSubview) {

            appState.activeCitizenSubview = targetSubview;
            
            const subviewsPool = ['home', 'market', 'insights'];
            subviewsPool.forEach(view => {
                const subviewContainer = document.getElementById(`subview-citizen-${view}`);
                const navItemButton = document.getElementById(`nav-item-${view}`);
                
                if (view === targetSubview) {
                    subviewContainer.classList.remove('hidden');
                    navItemButton.className = "flex flex-col items-center gap-1 text-teal-400 group transition-all";
                } else {
                    subviewContainer.classList.add('hidden');
                    navItemButton.className = "flex flex-col items-center gap-1 text-slate-500 group transition-all";
                }
            });

            if (targetSubview === 'home') renderCitizenIncidentFeedDeck();
            if (targetSubview === 'market') renderRewardsMarketplaceCatalog();
        }


        // Citizen Incidents List Array Core Grid Generator Loop Compiler
        function renderCitizenIncidentFeedDeck() {
            const listFeedBoxContainer = document.getElementById('citizen-incident-list');
            listFeedBoxContainer.innerHTML = '';

            appState.incidentsMainRegister.forEach(item => {
                let statusBadgeThemeStyleClasses = '';
                if (item.status === 'Pending') statusBadgeThemeStyleClasses = 'text-rose-400 bg-rose-500/10 border border-rose-500/20';
                else if (item.status === 'Assigned') statusBadgeThemeStyleClasses = 'text-blue-400 bg-blue-500/10 border border-blue-500/20';
                else statusBadgeThemeStyleClasses = 'text-teal-400 bg-teal-500/10 border border-teal-500/20';

                const cardRowHtmlTemplateString = `
                    <div class="glass-panel rounded-2xl p-4 flex items-center justify-between border border-slate-900/60 shadow-sm transition-all">
                        <div class="min-w-0 flex-1 pr-3">
                            <h4 class="text-xs font-bold text-slate-900 truncate tracking-tight">${item.category}</h4>
                            <p class="text-[11px] text-slate-400 truncate mt-1">📍 ${item.address}</p>
                            <span class="text-[9px] text-slate-600 font-medium block mt-1.5">${item.timeString}</span>
                        </div>
                        <span class="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded border shrink-0 ${statusBadgeThemeStyleClasses}">

                            ${item.status}
                        </span>
                    </div>
                `;
                listFeedBoxContainer.insertAdjacentHTML('beforeend', cardRowHtmlTemplateString);
            });

            document.getElementById('lbl-citizen-points').innerText = appState.pointsScoreBalance.toLocaleString();
        }

        // Rewards Marketplace Catalog Generator Layout Renderer
        function renderRewardsMarketplaceCatalog() {
            const gridContainer = document.getElementById('rewards-marketplace-grid');
            gridContainer.innerHTML = '';

            appState.rewardsCatalogData.forEach(reward => {
                const canAffordBoolean = appState.pointsScoreBalance >= reward.metricCost;
                const buttonStatusStyleClass = canAffordBoolean 
                    ? "bg-teal-600 hover:bg-teal-500 text-slate-900 shadow-md active:scale-95" 

                    : "bg-white border border-slate-200 text-slate-600 cursor-not-allowed";

                const catalogCardHtmlStr = `
                    <div class="glass-panel rounded-2xl p-4 flex items-center justify-between border border-slate-900 transition-all duration-300">
                        <div class="flex items-center gap-3.5 min-w-0">
                            <div class="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-inner shrink-0">${reward.icon}</div>
                            <div class="min-w-0">
                                <span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest block leading-none">${reward.category}</span>
                                <h4 class="text-xs font-bold text-slate-900 truncate mt-1 tracking-tight">${reward.title}</h4>
                                <span class="text-[11px] font-extrabold text-teal-400 mt-1 block">${reward.metricCost} CivicPoints</span>
                            </div>
                        </div>
                        <button onclick="executePointsRedemptionTransaction('${reward.id}', ${reward.metricCost}, ${canAffordBoolean})" class="px-3 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all shrink-0 ${buttonStatusStyleClass}">
                            Redeem
                        </button>
                    </div>
                `;
                gridContainer.insertAdjacentHTML('beforeend', catalogCardHtmlStr);
            });

        }

        // Execute Points Wallet Exchange Logic Pipeline 
        function executePointsRedemptionTransaction(rewardId, pointsCost, eligibleFlg) {
            if (!eligibleFlg) {
                triggerSystemToastNotification("Insufficient Point Metrics Balance", "Participate in local reporting and segregation verification to allocate extra points scores.");
                return;
            }

            appState.pointsScoreBalance -= pointsCost;
            renderRewardsMarketplaceCatalog();
            
            triggerSystemToastNotification(
                "Voucher Unlocked 🎟️",
                `Transaction cleared successfully. Digital validation record transmitted to messaging queue profiles.`
            );
        }

        // Camera Lens Shutter Layout View Router Controller Function Block Link

        function toggleOpticalLens(showLensFlg) {
            const containerBoxOverlay = document.getElementById('view-camera-overlay');
            if (showLensFlg) {
                containerBoxOverlay.classList.remove('hidden');
                revertLensToViewfinder();
            } else {
                containerBoxOverlay.classList.add('hidden');
            }
        }

        // Restore Lens stream state metrics structures variables configurations changes parameter
        function revertLensToViewfinder() {
            document.getElementById('lens-inference-sheet').classList.add('hidden');
            document.getElementById('shutter-trigger-frame').classList.remove('hidden');
            document.getElementById('lens-crosshair-bracket').classList.remove('hidden');
            
            const backgroundFeedBox = document.getElementById('lens-feed-background');
            backgroundFeedBox.style.backgroundImage = "url('https://placehold.co/600x800/0f172a/ffffff?text=Lens+Scanner+Stream+Active')";
        }


        // Trigger simulated capture photo mapping extraction variables logs bounds
        function executeLensPhotoCapture() {
            const derivedRandAddressStr = appState.addressesGeolocationsDataPool[Math.floor(Math.random() * appState.addressesGeolocationsDataPool.length)];
            appState.extractedStagedAddress = derivedRandAddressStr;

            document.getElementById('shutter-trigger-frame').classList.add('hidden');
            document.getElementById('lens-crosshair-bracket').classList.add('hidden');

            const backgroundFeedBox = document.getElementById('lens-feed-background');
            backgroundFeedBox.style.backgroundImage = "url('https://placehold.co/600x800/1e293b/10b981?text=Target+Node+Captured')";

            document.getElementById('lens-inference-sheet').classList.remove('hidden');
            document.getElementById('lbl-extracted-address-string').innerText = derivedRandAddressStr;
        }

        // Update active classification target categories selections arrays metrics weights
        function updateStagedCategory(targetCategoryStr, activeChipElementId) {
            appState.selectedStagedCategory = targetCategoryStr;
            

            const chipsRegistry = ['btn-chip-1', 'btn-chip-2', 'btn-chip-3', 'btn-chip-4'];
            chipsRegistry.forEach(id => {
                const chipRefElement = document.getElementById(id);
                if (id === activeChipElementId) {
                    chipRefElement.className = "p-3 rounded-xl text-xs font-bold text-left transition-all border bg-teal-500/10 border-teal-500 text-teal-400";
                } else {
                    chipRefElement.className = "p-3 rounded-xl text-xs font-bold text-left transition-all border bg-white border-slate-200/80 text-slate-500";
                }
            });
        }

        // Interactive simulated network connectivity modifier component switch trigger
        function toggleSimulatedNetworkState() {
            appState.isNetworkOnline = !appState.isNetworkOnline;
            const btnNetRef = document.getElementById('btn-network-toggle');
            
            if (appState.isNetworkOnline) {
                btnNetRef.className = "bg-teal-500/10 text-teal-400 text-[9px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full border border-teal-500/30 backdrop-blur-md";
                btnNetRef.innerText = "Network: Online";

                
                // Flush local memory offline storage buffer queues into global array registers
                if (appState.offlineUploadReportQueue.length > 0) {
                    appState.incidentsMainRegister = [...appState.offlineUploadReportQueue, ...appState.incidentsMainRegister];
                    appState.offlineUploadReportQueue = [];
                    document.getElementById('offline-queue-badge').classList.add('hidden');
                    triggerSystemToastNotification("Offline Buffers Synced ✓", "Network path active. Flushed local offline incident data pools into municipal cloud tracking networks.");
                }
            } else {
                btnNetRef.className = "bg-amber-500/10 text-amber-400 text-[9px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full border border-amber-500/30 backdrop-blur-md";
                btnNetRef.innerText = "Network: Offline";
            }
        }

        // Commit citizen form upload transactional registry data pipeline models configurations changes
        function commitIncidentReportSubmission() {
            const incidentDataModelNode = {
                id: Date.now(),
                category: appState.selectedStagedCategory,

                address: appState.extractedStagedAddress.split(' (')[0],
                status: 'Pending',
                timeString: 'Just now',
                details: 'Citizen sourced verification parameter data cluster submitted via interactive viewport analytics lenses.',
                imgMarker: 'User+Report'
            };

            // Evaluate offline first network infrastructure deployment fallbacks models logic parameters criteria
            if (appState.isNetworkOnline) {
                appState.incidentsMainRegister.unshift(incidentDataModelNode);
                appState.pointsScoreBalance += 20; // Award higher +20 allocation value indices weights
                triggerSystemToastNotification("SwaachX Uploaded Successfully! ✨", "Data packets cataloged into spatial matrix queues. +20 CivicPoints assigned.");
            } else {
                appState.offlineUploadReportQueue.unshift(incidentDataModelNode);
                appState.pointsScoreBalance += 20; // Secure calculation totals points locally
                document.getElementById('offline-queue-badge').classList.remove('hidden');
                triggerSystemToastNotification("Saved to Offline Buffer 💾", "Platform offline. Log record cached locally. System will auto flush packets upon connection restore tracking lines.");
            }


            toggleOpticalLens(false);
            navToCitizenSubview('home');
        }

        // MACHINE LEARNING PREDICTIVE ANALYTICS GRAPHICS LAYER INTERACTION FEATURE TOGGLER SWITCH ENGINE
        function togglePredictiveHotspotsLayer(isLayerActiveFlg) {
            const mlGraphicsGroupRef = document.getElementById('ml-hotspots-group');
            if (isLayerActiveFlg) {
                mlGraphicsGroupRef.setAttribute('class', 'block');
                triggerSystemToastNotification("Waste Hotspot Layer Active 🔮", "Clustering forecasts loaded from historic fill cycle trends models parameters vectors analytics paths.");
            } else {
                mlGraphicsGroupRef.setAttribute('class', 'hidden');
            }
        }

        // Sanitation Driver Dashboard Interface Views Render Data Connector Sync System
        function synchronizeOperationsDriverDashboardView() {
            const nonCollectedIncidentsQueue = appState.incidentsMainRegister.filter(i => i.status === 'Pending' || i.status === 'Assigned');
            const totalWorkElementsInt = appState.incidentsMainRegister.length;

            const completedWorkElementsInt = appState.incidentsMainRegister.filter(i => i.status === 'Collected').length;

            document.getElementById('lbl-driver-progress-counter').innerText = `${completedWorkElementsInt} / ${totalWorkElementsInt} Done`;

            const targetPingNodeElement = document.getElementById('map-target-node-ping');
            const targetCoreNodeElement = document.getElementById('map-target-node-core');

            if (nonCollectedIncidentsQueue.length > 0) {
                const headTaskModelNode = nonCollectedIncidentsQueue[0];
                document.getElementById('lbl-driver-job-title').innerText = headTaskModelNode.category;
                document.getElementById('lbl-driver-job-address').innerText = `${headTaskModelNode.address} (Zone Route Fleet Delta)`;
                document.getElementById('lbl-driver-job-time').innerText = `Reported: ${headTaskModelNode.timeString}`;
                document.getElementById('lbl-driver-job-desc').innerText = headTaskModelNode.details;
                document.getElementById('box-driver-evidence-thumb').innerText = "⚠️";
                document.getElementById('driver-console-panel').classList.remove('opacity-40');
                
                if(targetPingNodeElement) targetPingNodeElement.setAttribute('class', 'animate-pulse opacity-30');
                if(targetCoreNodeElement) targetCoreNodeElement.setAttribute('fill', '#ef4444');
                document.getElementById('route-trajectory-vector').setAttribute('stroke', '#1D4ED8');

            } else {
                document.getElementById('lbl-driver-job-title').innerText = "Sector Fleet Secure";
                document.getElementById('lbl-driver-job-address').innerText = "All active structural logistics paths check out optimized clean.";
                document.getElementById('lbl-driver-job-time').innerText = "Optimal Equilibrium";
                document.getElementById('lbl-driver-job-desc').innerText = "No outstanding hazard verification data queues waiting processing parameters validation frameworks boundaries.";
                document.getElementById('box-driver-evidence-thumb').innerText = "✓";
                document.getElementById('driver-console-panel').classList.add('opacity-40');
                
                if(targetPingNodeElement) targetPingNodeElement.setAttribute('class', 'hidden');
                if(targetCoreNodeElement) targetCoreNodeElement.setAttribute('fill', '#0B7A5A');
                document.getElementById('route-trajectory-vector').setAttribute('stroke', '#0B7A5A');
            }

            document.getElementById('ops-swipe-confirm-slider').value = 0;
        }

        // Process glove ready wide interactive range tracker element slider inputs validations mechanisms transformations updates
        function processOperationsSwipeValidation(inputSliderRefElement) {
            if (parseInt(inputSliderRefElement.value) === 100) {

                const remainingUncollectedQueue = appState.incidentsMainRegister.filter(i => i.status === 'Pending' || i.status === 'Assigned');
                
                if (remainingUncollectedQueue.length > 0) {
                    const dynamicActiveTargetId = remainingUncollectedQueue[0].id;
                    const referenceRegistryIndexInt = appState.incidentsMainRegister.findIndex(i => i.id === dynamicActiveTargetId);
                    
                    if (referenceRegistryIndexInt !== -1) {
                        appState.incidentsMainRegister[referenceRegistryIndexInt].status = 'Collected';
                        appState.incidentsMainRegister[referenceRegistryIndexInt].timeString = 'Collected just now';
                    }

                    triggerSystemToastNotification(
                        "Pickup Dispatched & Cleared ✓",
                        "Telemetry packet dispatched to city reporting grids ledger database files structures boundaries."
                    );
                }
                
                synchronizeOperationsDriverDashboardView();
            }

        }

        // System Core Toast Message Notification Engine Modulators Triggers Pipeline Actions
        function triggerSystemToastNotification(headlineStr, messageDescriptionStr) {
            const toastFrameAlertBox = document.getElementById('toast-hub-alert');
            document.getElementById('toast-headline').innerText = headlineStr;
            document.getElementById('toast-subtext').innerText = messageDescriptionStr;

            toastFrameAlertBox.className = toastFrameAlertBox.className.replace('-translate-y-36 opacity-0 pointer-events-none', 'translate-y-0 opacity-100 pointer-events-auto');

            setTimeout(() => {
                toastFrameAlertBox.className = toastFrameAlertBox.className.replace('translate-y-0 opacity-100 pointer-events-auto', '-translate-y-36 opacity-0 pointer-events-none');
            }, 4500);
        }

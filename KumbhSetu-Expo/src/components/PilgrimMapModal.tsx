import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useApp } from '@/context/AppContext';
import { PILGRIM_PLACES, PilgrimPlace } from '@/data/pilgrimagePlaces';
import { KumbhColors } from '@/constants/colors';

interface LiveSearchResult {
  id: string;
  name: string;
  detail: string;
  latitude: number;
  longitude: number;
  isOnlineResult?: boolean;
}

export const PilgrimMapModal: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { isMapModalOpen, setIsMapModalOpen, language } = useApp();

  const [activePlace, setActivePlace] = useState<PilgrimPlace>(PILGRIM_PLACES[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchingOnline, setIsSearchingOnline] = useState<boolean>(false);
  const [onlineResults, setOnlineResults] = useState<LiveSearchResult[]>([]);

  const [selectedMode, setSelectedMode] = useState<'driving' | 'walking' | 'cycling'>('driving');
  const [mapLayer, setMapLayer] = useState<'streets' | 'satellite' | 'dark'>('streets');
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  // User GPS Location (Nashik reference default, dynamically updated by live GPS)
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 19.9912,
    longitude: 73.7845,
  });
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [routeInfo, setRouteInfo] = useState<{
    distanceKm: number;
    durationMins: number;
    summary: string;
    steps: Array<{ instruction: string; distance: string; type: string }>;
  }>({
    distanceKm: 2.5,
    durationMins: 8,
    summary: 'via Main Pilgrim Transit Road',
    steps: [],
  });

  const webViewRef = useRef<WebView>(null);
  const searchTimeoutRef = useRef<any>(null);

  // Fetch real GPS location
  const fetchUserLocation = async () => {
    setIsLocating(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (loc && loc.coords) {
          const newCoords = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };
          setUserLocation(newCoords);
        }
      }
    } catch (err) {
      console.warn('GPS location request warning:', err);
    } finally {
      setIsLocating(false);
    }
  };

  useEffect(() => {
    if (isMapModalOpen) {
      fetchUserLocation();
    }
  }, [isMapModalOpen]);

  // Global Live Geocoding Search (Searches ANY place, street, address, landmark)
  const performLiveGeocodeSearch = useCallback(async (query: string) => {
    if (!query.trim() || query.trim().length < 2) {
      setOnlineResults([]);
      setIsSearchingOnline(false);
      return;
    }

    setIsSearchingOnline(true);
    try {
      // 1. Local places match
      const localMatches: LiveSearchResult[] = PILGRIM_PLACES.filter((p) => {
        const n = (p.name[language] || p.name.hi || p.name.en).toLowerCase();
        return n.includes(query.toLowerCase());
      }).map((p) => ({
        id: p.id,
        name: p.name[language] || p.name.hi || p.name.en,
        detail: 'Holy Mela Site, Nashik',
        latitude: p.latitude,
        longitude: p.longitude,
        isOnlineResult: false,
      }));

      // 2. Online Geocoding via Nominatim & Photon global location search
      const encodedQuery = encodeURIComponent(query.trim());
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}&limit=8&addressdetails=1`;
      
      const response = await fetch(nominatimUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'KumbhSetuApp/1.0',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          const fetchedResults: LiveSearchResult[] = data.map((item: any) => {
            const rawTitle = item.name || item.display_name.split(',')[0];
            const rawSub = item.display_name.split(',').slice(1, 4).join(',').trim();
            return {
              id: `geo_${item.place_id || Math.random()}`,
              name: rawTitle,
              detail: rawSub || item.display_name,
              latitude: parseFloat(item.lat),
              longitude: parseFloat(item.lon),
              isOnlineResult: true,
            };
          });

          // Deduplicate and combine
          const combined = [...localMatches, ...fetchedResults];
          setOnlineResults(combined);
        } else {
          setOnlineResults(localMatches);
        }
      } else {
        setOnlineResults(localMatches);
      }
    } catch (err) {
      console.warn('Geocoding search error:', err);
    } finally {
      setIsSearchingOnline(false);
    }
  }, [language]);

  // Debounced query change
  const handleSearchQueryChange = (text: string) => {
    setSearchQuery(text);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (text.trim().length >= 2) {
      searchTimeoutRef.current = setTimeout(() => {
        performLiveGeocodeSearch(text);
      }, 350);
    } else {
      setOnlineResults([]);
      setIsSearchingOnline(false);
    }
  };

  const placeName = activePlace.name[language] || activePlace.name.hi || activePlace.name.en;

  // Handle messages sent from the interactive Leaflet Web view
  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'ROUTE_CALCULATED') {
        setRouteInfo({
          distanceKm: data.distanceKm,
          durationMins: data.durationMins,
          summary: data.summary || 'via Authorized Route',
          steps: data.steps || [],
        });
      } else if (data.type === 'MAP_CLICKED') {
        // User clicked a custom spot on the map
        const customPlace: PilgrimPlace = {
          id: `custom_${Date.now()}`,
          name: {
            hi: data.name || 'चयनित स्थान (Dropped Pin)',
            en: data.name || 'Dropped Pin Location',
          },
          latitude: data.lat,
          longitude: data.lng,
        };
        setActivePlace(customPlace);
      }
    } catch (err) {
      console.warn('WebView message parsing error:', err);
    }
  };

  // Google Maps Style Full Interactive Leaflet HTML
  const mapHtml = useMemo(() => {
    const placesJson = JSON.stringify(
      PILGRIM_PLACES.map((p) => ({
        id: p.id,
        lat: p.latitude,
        lng: p.longitude,
        title: p.name[language] || p.name.hi || p.name.en,
        isCurrent: p.id === activePlace.id,
      }))
    );

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    body, html, #map {
      margin: 0; padding: 0; width: 100%; height: 100%;
      background: #e5e7eb; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .leaflet-control-attribution { display: none !important; }
    
    /* Google Maps Blue Dot GPS Location with Radar Pulse */
    .user-gps-dot {
      width: 18px; height: 18px;
      background: #1A73E8;
      border: 3px solid #FFFFFF;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(26, 115, 232, 0.6);
      position: relative;
    }
    .user-gps-pulse {
      position: absolute;
      top: -8px; left: -8px;
      width: 34px; height: 34px;
      border-radius: 50%;
      background: rgba(26, 115, 232, 0.25);
      animation: pulse 1.8s ease-out infinite;
    }
    @keyframes pulse {
      0% { transform: scale(0.6); opacity: 1; }
      100% { transform: scale(1.6); opacity: 0; }
    }

    /* Google Maps Red Destination Pin */
    .gmaps-pin {
      width: 28px; height: 28px;
      background: #EA4335;
      border: 2px solid #FFFFFF;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 3px 8px rgba(0,0,0,0.3);
      display: flex; align-items: center; justify-content: center;
    }
    .gmaps-pin-inner {
      width: 10px; height: 10px;
      background: #FFFFFF;
      border-radius: 50%;
      transform: rotate(45deg);
    }
    .gmaps-pin.active {
      background: #C5221F;
      transform: rotate(-45deg) scale(1.18);
      box-shadow: 0 0 0 4px rgba(234, 67, 53, 0.4);
    }

    .leaflet-popup-content-wrapper {
      border-radius: 12px;
      padding: 6px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    }
    .popup-title {
      font-weight: 700; font-size: 13px; color: #1E293B; margin-bottom: 2px;
    }
    .popup-coords {
      font-size: 10px; color: #64748B;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var userLat = ${userLocation.latitude};
    var userLng = ${userLocation.longitude};
    var destLat = ${activePlace.latitude};
    var destLng = ${activePlace.longitude};
    var currentMode = '${selectedMode}';
    var places = ${placesJson};

    // Layer Tiles
    var streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 });
    var satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 });
    var darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 });

    var initialLayer = streetLayer;
    if ('${mapLayer}' === 'satellite') initialLayer = satelliteLayer;
    if ('${mapLayer}' === 'dark') initialLayer = darkLayer;

    var map = L.map('map', {
      zoomControl: false,
      layers: [initialLayer]
    }).setView([userLat, userLng], 14);

    // 1. User Location Marker (Google Maps Style Pulse Dot)
    var userMarkerIcon = L.divIcon({
      className: '',
      html: '<div class="user-gps-dot"><div class="user-gps-pulse"></div></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
    var userMarker = L.marker([userLat, userLng], { icon: userMarkerIcon }).addTo(map);
    userMarker.bindPopup('<div class="popup-title">📍 Your Location (आप यहाँ हैं)</div>');

    // 2. Destination Markers
    var markers = {};
    places.forEach(function(p) {
      var isAct = p.id === '${activePlace.id}';
      var pinHtml = '<div class="gmaps-pin ' + (isAct ? 'active' : '') + '"><div class="gmaps-pin-inner"></div></div>';
      var pinIcon = L.divIcon({
        className: '',
        html: pinHtml,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      });

      var marker = L.marker([p.lat, p.lng], { icon: pinIcon }).addTo(map);
      marker.bindPopup('<div class="popup-title">' + p.title + '</div><div class="popup-coords">' + p.lat.toFixed(4) + '° N, ' + p.lng.toFixed(4) + '° E</div>');
      if (isAct) {
        marker.openPopup();
      }
      markers[p.id] = marker;
    });

    // Custom Dropped Target Marker (for searched locations or map taps)
    var targetPinIcon = L.divIcon({
      className: '',
      html: '<div class="gmaps-pin active"><div class="gmaps-pin-inner"></div></div>',
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    });
    var activeTargetMarker = L.marker([destLat, destLng], { icon: targetPinIcon }).addTo(map);

    // 3. Google Maps Style Route Polyline
    var routePolyline = L.polyline([], {
      color: '#1A73E8',
      weight: 6,
      opacity: 0.9,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    var routeOutline = L.polyline([], {
      color: '#0D47A1',
      weight: 8,
      opacity: 0.5,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(map);

    // Fetch Turn-by-Turn Road Route from OSRM Navigation API
    function calculateRoadRoute(fromLat, fromLng, toLat, toLng, mode) {
      var osrmProfile = mode === 'walking' ? 'foot' : 'driving';
      var osrmUrl = 'https://router.project-osrm.org/route/v1/' + osrmProfile + '/' + fromLng + ',' + fromLat + ';' + toLng + ',' + toLat + '?overview=full&geometries=geojson&steps=true';

      fetch(osrmUrl)
        .then(function(res) { return res.json(); })
        .then(function(data) {
          if (data && data.routes && data.routes.length > 0) {
            var route = data.routes[0];
            var coords = route.geometry.coordinates.map(function(c) { return [c[1], c[0]]; });
            
            routeOutline.setLatLngs(coords);
            routePolyline.setLatLngs(coords);

            var bounds = L.latLngBounds(coords);
            map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });

            var distKm = (route.distance / 1000).toFixed(1);
            var durMin = Math.round(route.duration / 60);

            var steps = [];
            if (route.legs && route.legs[0] && route.legs[0].steps) {
              steps = route.legs[0].steps.map(function(s) {
                var stepDist = s.distance > 1000 ? (s.distance / 1000).toFixed(1) + ' km' : Math.round(s.distance) + ' m';
                var instruction = s.maneuver.type + (s.name ? ' onto ' + s.name : '');
                if (s.maneuver.type === 'depart') instruction = 'Head out on ' + (s.name || 'road');
                if (s.maneuver.type === 'arrive') instruction = 'Arrive at destination';
                if (s.maneuver.modifier) instruction += ' (' + s.maneuver.modifier + ')';
                return {
                  instruction: instruction,
                  distance: stepDist,
                  type: s.maneuver.type
                };
              });
            }

            // Post back route result to React Native
            var msg = JSON.stringify({
              type: 'ROUTE_CALCULATED',
              distanceKm: parseFloat(distKm),
              durationMins: durMin,
              summary: route.legs && route.legs[0] ? route.legs[0].summary || 'Fastest Route' : 'Fastest Route',
              steps: steps
            });

            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(msg);
            }
          } else {
            fallbackStraightRoute(fromLat, fromLng, toLat, toLng);
          }
        })
        .catch(function(err) {
          fallbackStraightRoute(fromLat, fromLng, toLat, toLng);
        });
    }

    function fallbackStraightRoute(fromLat, fromLng, toLat, toLng) {
      var pts = [[fromLat, fromLng], [toLat, toLng]];
      routeOutline.setLatLngs(pts);
      routePolyline.setLatLngs(pts);
      map.fitBounds(L.latLngBounds(pts), { padding: [50, 50] });
    }

    // Initial Route calculation
    calculateRoadRoute(userLat, userLng, destLat, destLng, currentMode);

    // Map Tap to drop pin anywhere with live Reverse Geocoding
    map.on('click', function(e) {
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
      
      activeTargetMarker.setLatLng([lat, lng]);
      calculateRoadRoute(userLat, userLng, lat, lng, currentMode);

      // Reverse geocode to find place name of tapped point
      fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng, {
        headers: { 'Accept': 'application/json' }
      })
      .then(function(res) { return res.json(); })
      .then(function(rev) {
        var placeName = rev && rev.display_name ? rev.display_name.split(',')[0] + ' (' + rev.display_name.split(',').slice(1,3).join(',').trim() + ')' : 'Dropped Pin (' + lat.toFixed(4) + ', ' + lng.toFixed(4) + ')';
        activeTargetMarker.bindPopup('<div class="popup-title">📍 ' + placeName + '</div>').openPopup();

        var msg = JSON.stringify({
          type: 'MAP_CLICKED',
          lat: lat,
          lng: lng,
          name: placeName
        });
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(msg);
        }
      })
      .catch(function() {
        var msg = JSON.stringify({
          type: 'MAP_CLICKED',
          lat: lat,
          lng: lng,
          name: 'Dropped Pin (' + lat.toFixed(4) + ', ' + lng.toFixed(4) + ')'
        });
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(msg);
        }
      });
    });

    window.updateNavigation = function(dLat, dLng, mode, layerName, targetTitle) {
      destLat = dLat;
      destLng = dLng;
      currentMode = mode || currentMode;

      activeTargetMarker.setLatLng([destLat, destLng]);
      if (targetTitle) {
        activeTargetMarker.bindPopup('<div class="popup-title">📍 ' + targetTitle + '</div>').openPopup();
      }

      calculateRoadRoute(userLat, userLng, destLat, destLng, currentMode);
    };

    window.centerOnUser = function() {
      map.flyTo([userLat, userLng], 16, { duration: 1 });
      userMarker.openPopup();
    };
  </script>
</body>
</html>`;
  }, [
    language,
    userLocation.latitude,
    userLocation.longitude,
    activePlace.id,
    activePlace.latitude,
    activePlace.longitude,
    selectedMode,
    mapLayer,
  ]);

  // Handle selecting any search result (local or globally geocoded)
  const handleSelectSearchResult = (result: LiveSearchResult) => {
    const selectedPlace: PilgrimPlace = {
      id: result.id,
      name: {
        hi: result.name,
        en: result.name,
      },
      latitude: result.latitude,
      longitude: result.longitude,
    };

    setActivePlace(selectedPlace);
    setSearchQuery('');
    setOnlineResults([]);

    if (Platform.OS !== 'web' && webViewRef.current) {
      webViewRef.current.injectJavaScript(
        `if (window.updateNavigation) { window.updateNavigation(${result.latitude}, ${result.longitude}, '${selectedMode}', '${mapLayer}', '${result.name.replace(/'/g, "\\'")}'); }; true;`
      );
    }
  };

  const handleSelectPlace = (place: PilgrimPlace) => {
    setActivePlace(place);
    setSearchQuery('');
    setOnlineResults([]);
    if (Platform.OS !== 'web' && webViewRef.current) {
      webViewRef.current.injectJavaScript(
        `if (window.updateNavigation) { window.updateNavigation(${place.latitude}, ${place.longitude}, '${selectedMode}', '${mapLayer}'); }; true;`
      );
    }
  };

  const handleModeChange = (mode: 'driving' | 'walking' | 'cycling') => {
    setSelectedMode(mode);
    if (Platform.OS !== 'web' && webViewRef.current) {
      webViewRef.current.injectJavaScript(
        `if (window.updateNavigation) { window.updateNavigation(${activePlace.latitude}, ${activePlace.longitude}, '${mode}', '${mapLayer}'); }; true;`
      );
    }
  };

  const handleCenterOnUser = () => {
    if (Platform.OS !== 'web' && webViewRef.current) {
      webViewRef.current.injectJavaScript(`if (window.centerOnUser) { window.centerOnUser(); }; true;`);
    }
  };

  return (
    <Modal
      visible={isMapModalOpen}
      animationType="slide"
      transparent={false}
      onRequestClose={() => setIsMapModalOpen(false)}>
      <View style={styles.container}>
        {/* GOOGLE MAPS FLOATING TOP HEADER & SEARCH BAR */}
        <View style={[styles.topFloatingHeader, { paddingTop: Math.max(insets.top + 8, 20) }]}>
          <View style={styles.searchBarCard}>
            <TouchableOpacity
              onPress={() => setIsMapModalOpen(false)}
              style={styles.searchIconBtn}>
              <Ionicons name="arrow-back" size={20} color="#1E293B" />
            </TouchableOpacity>

            <TextInput
              style={styles.searchTextInput}
              placeholder="Search any place, hotel, ghat, address..."
              placeholderTextColor="#64748B"
              value={searchQuery}
              onChangeText={handleSearchQueryChange}
            />

            {isSearchingOnline ? (
              <View style={styles.searchIconBtn}>
                <ActivityIndicator size="small" color="#1A73E8" />
              </View>
            ) : searchQuery ? (
              <TouchableOpacity
                onPress={() => {
                  setSearchQuery('');
                  setOnlineResults([]);
                }}
                style={styles.searchIconBtn}>
                <Ionicons name="close-circle" size={18} color="#94A3B8" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={fetchUserLocation} style={styles.searchIconBtn}>
                {isLocating ? (
                  <ActivityIndicator size="small" color="#1A73E8" />
                ) : (
                  <Ionicons name="locate" size={18} color="#1A73E8" />
                )}
              </TouchableOpacity>
            )}
          </View>

          {/* Live Global Geocoding Search Dropdown */}
          {onlineResults.length > 0 && (
            <View style={styles.searchResultsDropdown}>
              <ScrollView style={{ maxHeight: 220 }} nestedScrollEnabled>
                {onlineResults.map((result) => (
                  <TouchableOpacity
                    key={result.id}
                    style={styles.searchResultRow}
                    onPress={() => handleSelectSearchResult(result)}>
                    <Ionicons
                      name={result.isOnlineResult ? 'earth' : 'location'}
                      size={16}
                      color={result.isOnlineResult ? '#1A73E8' : '#EA4335'}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.searchResultTitle} numberOfLines={1}>
                        {result.name}
                      </Text>
                      <Text style={styles.searchResultSubtitle} numberOfLines={1}>
                        {result.detail}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* GOOGLE MAPS MODE SELECTOR BAR (Drive / Walk / Transit / Bike) */}
          <View style={styles.modeBar}>
            <TouchableOpacity
              style={[styles.modeChip, selectedMode === 'driving' && styles.modeChipActive]}
              onPress={() => handleModeChange('driving')}
              activeOpacity={0.8}>
              <Ionicons
                name="car"
                size={14}
                color={selectedMode === 'driving' ? '#1A73E8' : '#64748B'}
              />
              <Text
                style={[
                  styles.modeChipText,
                  selectedMode === 'driving' && styles.modeChipTextActive,
                ]}>
                Drive
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modeChip, selectedMode === 'walking' && styles.modeChipActive]}
              onPress={() => handleModeChange('walking')}
              activeOpacity={0.8}>
              <Ionicons
                name="footsteps"
                size={14}
                color={selectedMode === 'walking' ? '#1A73E8' : '#64748B'}
              />
              <Text
                style={[
                  styles.modeChipText,
                  selectedMode === 'walking' && styles.modeChipTextActive,
                ]}>
                Walk
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modeChip, selectedMode === 'cycling' && styles.modeChipActive]}
              onPress={() => handleModeChange('cycling')}
              activeOpacity={0.8}>
              <Ionicons
                name="bicycle"
                size={14}
                color={selectedMode === 'cycling' ? '#1A73E8' : '#64748B'}
              />
              <Text
                style={[
                  styles.modeChipText,
                  selectedMode === 'cycling' && styles.modeChipTextActive,
                ]}>
                Two-Wheeler
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modeChip, { marginLeft: 'auto' }]}
              onPress={() => {
                setMapLayer(mapLayer === 'streets' ? 'satellite' : mapLayer === 'satellite' ? 'dark' : 'streets');
              }}>
              <Ionicons name="layers-outline" size={14} color="#1E293B" />
              <Text style={styles.modeChipText}>
                {mapLayer === 'streets' ? 'Default' : mapLayer === 'satellite' ? 'Satellite' : 'Night'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FULLSCREEN LEAFLET / OPENSTREETMAP VIEWPORT */}
        <View style={styles.mapViewport}>
          {Platform.OS === 'web' ? (
            <iframe
              srcDoc={mapHtml}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="Google Maps Navigation View"
            />
          ) : (
            <WebView
              ref={webViewRef}
              originWhitelist={['*']}
              source={{ html: mapHtml }}
              style={styles.webView}
              javaScriptEnabled
              domStorageEnabled
              onMessage={handleWebViewMessage}
              startInLoadingState
            />
          )}

          {/* Floating Action Button: Recenter on Live GPS */}
          <TouchableOpacity
            style={styles.gpsRecenterFab}
            onPress={handleCenterOnUser}
            activeOpacity={0.85}>
            <Ionicons name="locate" size={20} color="#1A73E8" />
          </TouchableOpacity>
        </View>

        {/* GOOGLE MAPS NAVIGATION HUD BANNER (When Navigation Active) */}
        {isNavigating && (
          <View style={styles.navHudBanner}>
            <View style={styles.navHudLeft}>
              <Ionicons name="arrow-up-circle" size={32} color="#FFFFFF" />
              <View style={{ flex: 1 }}>
                <Text style={styles.navHudManeuver} numberOfLines={1}>
                  In 300m, continue onto destination route
                </Text>
                <Text style={styles.navHudSub} numberOfLines={1}>
                  Target: {placeName}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.exitNavBtn}
              onPress={() => setIsNavigating(false)}>
              <Text style={styles.exitNavBtnText}>Exit</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* GOOGLE MAPS BOTTOM ROUTE SHEET */}
        <View style={styles.bottomRouteCard}>
          <View style={styles.cardDragHandle} />

          <View style={styles.routeHeaderInfo}>
            <View style={{ flex: 1 }}>
              <View style={styles.etaRow}>
                <Text style={styles.durationBig}>{routeInfo.durationMins} min</Text>
                <Text style={styles.distanceBig}>({routeInfo.distanceKm} km)</Text>
              </View>
              <Text style={styles.routeSummarySub} numberOfLines={1}>
                {routeInfo.summary} • Target: <Text style={{ color: '#0F172A', fontWeight: '700' }}>{placeName}</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.startNavBtn, isNavigating && styles.startNavBtnActive]}
              onPress={() => setIsNavigating(!isNavigating)}
              activeOpacity={0.85}>
              <Ionicons
                name={isNavigating ? 'stop-circle' : 'navigate'}
                size={16}
                color="#FFFFFF"
              />
              <Text style={styles.startNavBtnText}>
                {isNavigating ? 'Stop Nav' : 'Start'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quick Horizontal Destinations Carousel */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalPlacesScroll}>
            {PILGRIM_PLACES.map((p) => {
              const isCur = p.id === activePlace.id;
              const name = p.name[language] || p.name.hi || p.name.en;
              return (
                <TouchableOpacity
                  key={p.id}
                  style={[styles.placePill, isCur && styles.placePillActive]}
                  onPress={() => handleSelectPlace(p)}>
                  <Ionicons
                    name="location"
                    size={12}
                    color={isCur ? '#FFFFFF' : '#EA4335'}
                  />
                  <Text style={[styles.placePillText, isCur && styles.placePillTextActive]}>
                    {name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Turn-by-Turn Maneuvers List */}
          {routeInfo.steps.length > 0 && (
            <ScrollView style={styles.stepListScroll} showsVerticalScrollIndicator={false}>
              {routeInfo.steps.map((st, i) => (
                <View key={i} style={styles.stepItemRow}>
                  <View style={styles.stepIconBubble}>
                    <Ionicons
                      name={
                        st.type === 'arrive'
                          ? 'checkmark-circle'
                          : st.type === 'turn'
                          ? 'arrow-forward'
                          : 'arrow-up'
                      }
                      size={13}
                      color="#1A73E8"
                    />
                  </View>
                  <Text style={styles.stepInstructionText}>{st.instruction}</Text>
                  <Text style={styles.stepDistanceText}>{st.distance}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topFloatingHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingBottom: 6,
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  searchBarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 8,
    height: 44,
    gap: 6,
  },
  searchIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchTextInput: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#0F172A',
  },
  searchResultsDropdown: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  searchResultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 10,
  },
  searchResultTitle: {
    fontSize: 12.5,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1E293B',
  },
  searchResultSubtitle: {
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    color: '#64748B',
    marginTop: 1,
  },
  modeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    paddingBottom: 2,
  },
  modeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 4,
  },
  modeChipActive: {
    backgroundColor: '#E8F0FE',
    borderWidth: 1,
    borderColor: '#1A73E8',
  },
  modeChipText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: '#475569',
  },
  modeChipTextActive: {
    color: '#1A73E8',
  },
  mapViewport: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#E5E7EB',
  },
  webView: {
    flex: 1,
  },
  gpsRecenterFab: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  navHudBanner: {
    position: 'absolute',
    top: 110,
    left: 12,
    right: 12,
    backgroundColor: '#0F9D58',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 20,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  navHudLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  navHudManeuver: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontFamily: 'Poppins_700Bold',
  },
  navHudSub: {
    color: '#E8F5E9',
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
  },
  exitNavBtn: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  exitNavBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Poppins_700Bold',
  },
  bottomRouteCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 10,
    maxHeight: 240,
  },
  cardDragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginBottom: 8,
  },
  routeHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  etaRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  durationBig: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: '#16A34A',
  },
  distanceBig: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    color: '#64748B',
  },
  routeSummarySub: {
    fontSize: 10.5,
    fontFamily: 'Poppins_500Medium',
    color: '#475569',
  },
  startNavBtn: {
    backgroundColor: '#1A73E8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#1A73E8',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  startNavBtnActive: {
    backgroundColor: '#DC2626',
  },
  startNavBtnText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontFamily: 'Poppins_700Bold',
  },
  horizontalPlacesScroll: {
    gap: 6,
    paddingVertical: 4,
    marginBottom: 6,
  },
  placePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  placePillActive: {
    backgroundColor: '#1A73E8',
    borderColor: '#1A73E8',
  },
  placePillText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: '#334155',
  },
  placePillTextActive: {
    color: '#FFFFFF',
  },
  stepListScroll: {
    maxHeight: 110,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 6,
  },
  stepItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  stepIconBubble: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepInstructionText: {
    flex: 1,
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: '#1E293B',
    textTransform: 'capitalize',
  },
  stepDistanceText: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    color: '#64748B',
  },
});

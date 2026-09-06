import React, { useState, useRef, useMemo } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Linking,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useApp } from '@/context/AppContext';
import { PILGRIM_PLACES, PilgrimPlace } from '@/data/pilgrimagePlaces';
import { KumbhColors } from '@/constants/colors';

export const PilgrimMapModal: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { isMapModalOpen, setIsMapModalOpen, language, t } = useApp();
  const [activePlace, setActivePlace] = useState<PilgrimPlace>(PILGRIM_PLACES[0]);
  const webViewRef = useRef<WebView>(null);

  const placeName = activePlace.name[language] || activePlace.name.hi || activePlace.name.en;
  const placeDesc = activePlace.description[language] || activePlace.description.hi || activePlace.description.en;

  const directions = activePlace.howToReach;
  const summary = directions.summary[language] || directions.summary.hi || directions.summary.en;
  const fromStation = directions.fromStation[language] || directions.fromStation.hi || directions.fromStation.en;
  const fromBusStand = directions.fromBusStand[language] || directions.fromBusStand.hi || directions.fromBusStand.en;
  const walkingRoute = directions.walkingRoute[language] || directions.walkingRoute.hi || directions.walkingRoute.en;
  const droppingPoint = directions.droppingPoint[language] || directions.droppingPoint.hi || directions.droppingPoint.en;

  // Open real-time turn-by-turn navigation in device maps
  const handleOpenGpsNavigation = (place: PilgrimPlace) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
    Linking.openURL(url).catch(() => {
      Linking.openURL(place.osmUrl);
    });
  };

  // Generate Leaflet in-app HTML
  const mapHtml = useMemo(() => {
    const placesJson = JSON.stringify(
      PILGRIM_PLACES.map((p) => ({
        id: p.id,
        lat: p.latitude,
        lng: p.longitude,
        title: p.name[language] || p.name.hi || p.name.en,
        timings: p.darshanTimings,
        color: p.imagePlaceholderColor,
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
      background: #f8fafc; font-family: sans-serif;
    }
    .custom-div-icon {
      background: #E85D04;
      border: 2px solid #FFFFFF;
      border-radius: 50%;
      color: white;
      text-align: center;
      line-height: 24px;
      font-size: 11px;
      font-weight: bold;
    }
    .custom-div-icon.active {
      background: #C2410C;
      box-shadow: 0 0 0 5px rgba(232, 93, 4, 0.45);
      transform: scale(1.25);
    }
    .leaflet-popup-content-wrapper {
      border-radius: 8px;
      padding: 4px;
      font-size: 12px;
    }
    .popup-title {
      font-weight: bold;
      color: #0F172A;
      margin-bottom: 2px;
    }
    .popup-sub {
      color: #64748B;
      font-size: 10px;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var places = ${placesJson};
    var activeLat = ${activePlace.latitude};
    var activeLng = ${activePlace.longitude};

    var map = L.map('map', {
      zoomControl: true,
      attributionControl: false
    }).setView([activeLat, activeLng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    var markers = {};

    places.forEach(function(p) {
      var iconHtml = '<div class="custom-div-icon ' + (p.isCurrent ? 'active' : '') + '" style="background:' + p.color + '">•</div>';
      var customIcon = L.divIcon({
        className: '',
        html: iconHtml,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });

      var marker = L.marker([p.lat, p.lng], { icon: customIcon }).addTo(map);
      marker.bindPopup('<div class="popup-title">' + p.title + '</div><div class="popup-sub">' + p.timings + '</div>');

      if (p.isCurrent) {
        marker.openPopup();
      }

      markers[p.id] = marker;
    });

    window.flyToPlace = function(lat, lng, id) {
      map.flyTo([lat, lng], 16, { duration: 1 });
      if (markers[id]) {
        markers[id].openPopup();
      }
    };
  </script>
</body>
</html>`;
  }, [language, activePlace.id, activePlace.latitude, activePlace.longitude]);

  // Navigate directly inside in-app map
  const handleSelectPlaceInApp = (place: PilgrimPlace) => {
    setActivePlace(place);
    if (Platform.OS !== 'web' && webViewRef.current) {
      webViewRef.current.injectJavaScript(
        `if (window.flyToPlace) { window.flyToPlace(${place.latitude}, ${place.longitude}, '${place.id}'); }; true;`
      );
    }
  };

  return (
    <Modal
      visible={isMapModalOpen}
      animationType="slide"
      transparent={false}
      onRequestClose={() => setIsMapModalOpen(false)}>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={[styles.header, { paddingTop: Math.max(insets.top + 12, 24) }]}>
          <TouchableOpacity
            onPress={() => setIsMapModalOpen(false)}
            style={styles.backBtn}
            activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={20} color={KumbhColors.templeBrown} />
          </TouchableOpacity>

          <View style={styles.headerTitleBox}>
            <Text style={styles.headerTitle}>{t.mapTitle}</Text>
            <Text style={styles.headerSub}>Select any location to see how to reach from your position</Text>
          </View>
        </View>

        {/* Interactive In-App OpenStreetMap Viewport */}
        <View style={styles.mapContainer}>
          {Platform.OS === 'web' ? (
            <iframe
              srcDoc={mapHtml}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title="In-App OpenStreetMap"
            />
          ) : (
            <WebView
              ref={webViewRef}
              originWhitelist={['*']}
              source={{ html: mapHtml }}
              style={styles.webView}
              javaScriptEnabled
              domStorageEnabled
              startInLoadingState
            />
          )}

          {/* Floating Selected Place Header Badge */}
          <View style={styles.floatingMarkerCard}>
            <View style={styles.markerPin}>
              <Ionicons name="location" size={16} color={KumbhColors.primary} />
            </View>
            <View style={styles.markerInfo}>
              <Text style={styles.markerTitle} numberOfLines={1}>
                {placeName}
              </Text>
              <Text style={styles.markerDist}>
                {activePlace.distanceKm} • {activePlace.darshanTimings}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.navGpsQuickBtn}
              onPress={() => handleOpenGpsNavigation(activePlace)}
              activeOpacity={0.85}>
              <Ionicons name="navigate" size={13} color="#FFFFFF" />
              <Text style={styles.navGpsQuickText}>Navigate</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Detailed How-To-Reach Drawer & Site Selector */}
        <View style={styles.bottomDrawer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.drawerScrollContent,
              { paddingBottom: Math.max(insets.bottom + 20, 30) },
            ]}>
            {/* Quick Horizontal Places Selector */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalSelector}>
              {PILGRIM_PLACES.map((p) => {
                const isCurrent = p.id === activePlace.id;
                const name = p.name[language] || p.name.hi || p.name.en;
                return (
                  <TouchableOpacity
                    key={p.id}
                    style={[styles.quickPlaceTab, isCurrent && styles.quickPlaceTabActive]}
                    onPress={() => handleSelectPlaceInApp(p)}
                    activeOpacity={0.8}>
                    <Ionicons
                      name={isCurrent ? 'location' : 'location-outline'}
                      size={13}
                      color={isCurrent ? '#FFFFFF' : KumbhColors.primaryDark}
                    />
                    <Text
                      style={[styles.quickPlaceTabText, isCurrent && styles.quickPlaceTabTextActive]}
                      numberOfLines={1}>
                      {name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* HOW TO GO THERE / TRANSIT DIRECTIONS SECTION */}
            <View style={styles.directionsCard}>
              <View style={styles.directionsHeader}>
                <View style={styles.directionsTitleRow}>
                  <FontAwesome5 name="directions" size={16} color={KumbhColors.primaryDark} />
                  <Text style={styles.directionsTitle}>How to Go There From Your Location</Text>
                </View>
                <TouchableOpacity
                  style={styles.liveNavFullBtn}
                  onPress={() => handleOpenGpsNavigation(activePlace)}
                  activeOpacity={0.85}>
                  <Ionicons name="navigate" size={14} color="#FFFFFF" />
                  <Text style={styles.liveNavFullBtnText}>Start Live GPS Route</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.directionsSummary}>{summary}</Text>

              {/* Transit Options Breakdown */}
              <View style={styles.transitStepList}>
                {/* 1. From Railway Station */}
                <View style={styles.transitStepItem}>
                  <View style={styles.stepIconBox}>
                    <Ionicons name="train" size={15} color={KumbhColors.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.stepTitle}>From Nashik Road Railway Station:</Text>
                    <Text style={styles.stepBody}>{fromStation}</Text>
                  </View>
                </View>

                {/* 2. From CBS Bus Stand */}
                <View style={styles.transitStepItem}>
                  <View style={styles.stepIconBox}>
                    <Ionicons name="bus" size={15} color={KumbhColors.secondary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.stepTitle}>From Central CBS Bus Stand:</Text>
                    <Text style={styles.stepBody}>{fromBusStand}</Text>
                  </View>
                </View>

                {/* 3. Walking Directions */}
                <View style={styles.transitStepItem}>
                  <View style={styles.stepIconBox}>
                    <Ionicons name="footsteps" size={15} color="#16A34A" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.stepTitle}>Pedestrian Walking Path:</Text>
                    <Text style={styles.stepBody}>{walkingRoute}</Text>
                  </View>
                </View>

                {/* 4. Drop-off Point */}
                <View style={styles.transitStepItem}>
                  <View style={styles.stepIconBox}>
                    <MaterialCommunityIcons name="map-marker-radius" size={15} color={KumbhColors.templeBrown} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.stepTitle}>Designated Vehicle Drop-Off Point:</Text>
                    <Text style={styles.stepBody}>{droppingPoint}</Text>
                  </View>
                </View>
              </View>

              {/* Timings & Aarti */}
              <View style={styles.timingsRow}>
                <View style={styles.timingItem}>
                  <Ionicons name="time-outline" size={13} color={KumbhColors.primary} />
                  <Text style={styles.timingText}>{activePlace.darshanTimings}</Text>
                </View>
                <View style={styles.timingItem}>
                  <Ionicons name="flame-outline" size={13} color={KumbhColors.secondaryDark} />
                  <Text style={styles.timingText}>{activePlace.aartiTimings}</Text>
                </View>
              </View>

              {/* Facilities at Location */}
              <View style={styles.facilitiesRow}>
                {activePlace.facilities.map((f, i) => (
                  <View key={i} style={styles.facilityPill}>
                    <Ionicons name="checkmark-circle" size={11} color="#16A34A" />
                    <Text style={styles.facilityText}>{f}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: KumbhColors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: KumbhColors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: KumbhColors.border,
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: KumbhColors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: KumbhColors.border,
  },
  headerTitleBox: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.textPrimary,
  },
  headerSub: {
    fontSize: 10.5,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_500Medium',
  },
  mapContainer: {
    height: '38%',
    backgroundColor: '#E5E7EB',
    position: 'relative',
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: KumbhColors.border,
  },
  webView: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  floatingMarkerCard: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: KumbhColors.primary,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  markerPin: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: KumbhColors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerInfo: {
    flex: 1,
  },
  markerTitle: {
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.textPrimary,
  },
  markerDist: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.textMuted,
  },
  navGpsQuickBtn: {
    backgroundColor: KumbhColors.primaryDark,
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  navGpsQuickText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontFamily: 'Poppins_600SemiBold',
  },
  bottomDrawer: {
    flex: 1,
    backgroundColor: KumbhColors.background,
    marginTop: 6,
  },
  drawerScrollContent: {
    paddingHorizontal: 12,
  },
  horizontalSelector: {
    gap: 6,
    paddingVertical: 6,
  },
  quickPlaceTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    maxWidth: 220,
  },
  quickPlaceTabActive: {
    backgroundColor: KumbhColors.primaryDark,
    borderColor: KumbhColors.primaryDark,
  },
  quickPlaceTabText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.templeDark,
  },
  quickPlaceTabTextActive: {
    color: '#FFFFFF',
  },
  directionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 6,
  },
  directionsHeader: {
    flexDirection: 'column',
    gap: 8,
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  directionsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  directionsTitle: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  liveNavFullBtn: {
    backgroundColor: KumbhColors.primaryDark,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  liveNavFullBtnText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontFamily: 'Poppins_700Bold',
  },
  directionsSummary: {
    fontSize: 11.5,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.riverBlueDark,
    backgroundColor: KumbhColors.riverBlueSoft,
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
    lineHeight: 16,
  },
  transitStepList: {
    gap: 8,
    marginBottom: 10,
  },
  transitStepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  stepIconBox: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepTitle: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.templeBrown,
  },
  stepBody: {
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.textSecondary,
    lineHeight: 15,
    marginTop: 1,
  },
  timingsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginBottom: 8,
  },
  timingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timingText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.charcoal,
  },
  facilitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  facilityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  facilityText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_500Medium',
    color: '#166534',
  },
});

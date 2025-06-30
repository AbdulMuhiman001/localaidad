import React from "react";
import { View, Text, StyleSheet, SafeAreaView ,TouchableOpacity} from "react-native";
import { font, color } from "@/utils/constants";
import BackArrow from "@/assets/images/left arrow.svg";
import Equalizer from "@/assets/images/equalizer-3-line.svg";
import Bell from "@/assets/images/bell-icon.svg";
import { router } from "expo-router";

export default function NotificationsEmpty() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
         <TouchableOpacity onPress={() => router.push("/home/feed")}>
        <BackArrow width={25} height={25} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Centre</Text>
        <Equalizer width={25} height={25} />
      </View>
      <View style={styles.divider} />
      {/* Empty State */}
      <View style={styles.emptyContainer}>
        <View style={styles.bellCircle}>
          <Bell width={48} height={48} />
        </View>
        <Text style={styles.emptyTitle}>You&apos;re All Caught Up!</Text>
        <Text style={styles.emptyDesc}>
          There&apos;s nothing new right now. Check back later to see updates from your posts, offers, and connections.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 45,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontFamily: font.regular,
    fontSize: 15,
    color: '#222',
    flex: 1,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  bellCircle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  emptyTitle: {
    fontFamily: font.semiBold,
    fontSize: 20,
    color: '#222',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDesc: {
    fontFamily: font.regular,
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
}); 
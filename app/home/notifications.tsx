import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { font, color } from "@/utils/constants";
import BackArrow from "@/assets/images/left arrow.svg";
import Equalizer from "@/assets/images/equalizer-3-line.svg";
import Bell from "@/assets/images/bell-icon.svg";
import Avatar1 from "@/assets/images/avatar_1.svg";
import Avatar2 from "@/assets/images/avatar_2.svg";
import Avatar3 from "@/assets/images/avatar_3.svg";
import Avatar4 from "@/assets/images/avatar_4.svg";
import Avatar5 from "@/assets/images/avatar_5.svg";
import Message from "@/assets/images/message.svg";
import { router } from "expo-router";
import NotificationsEmpty from "./notifications-empty";

const TABS = [
  { key: "all", label: "All" },
  { key: "comments", label: "Comments" },
  { key: "likes", label: "Likes" },
  { key: "mentions", label: "Mentions" },
  { key: "coins", label: "EYS Coins" },
];

// Mock notification data
const NOTIFICATIONS = [
  {
    id: "1",
    type: "comments",
    avatar: Avatar1,
    title: "Patrick commented on your post",
    message:"Looks perfect, send it for review tomorrow",
    time: "Just Now",
    action: "View Comment",
  },
  {
    id: "2",
    type: "likes",
    avatar: Avatar2,
    title: "Lisa liked your post",
    message: "Your post 'Stuck in traffic 🚗' got 1 like.",
    time: "Just Now",
    action: "View Post",
  },
  {
    id: "3",
    type: "mentions",
    avatar: Avatar3,
    title: "You were metion by Steve",
    message: "@you check this post, might help!",
    time: "Just Now",
    action: "View Mention",
  },
  {
    id: "4",
    type: "coins",
    avatar: Avatar4,
    title: "You earned 75 EYS Coins!",
    message: "From your recent post 'Local Coffee Spot ☕'.",
    time: "Just Now",
    action: "See Balance",
  },
  {
    id: "5",
    type: "coins",
    avatar: Avatar5,
    title: "Coins added sucessfully",
    message:"4200 EYS added to your balance.",
    time: "Just Now",
    action: "See Balance",
  },

];

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredNotifications =
    activeTab === "all"
      ? NOTIFICATIONS
      : NOTIFICATIONS.filter((n) => n.type === activeTab);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackArrow width={25} height={25} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Centre</Text>
        <Equalizer width={25} height={25} />
      </View>
      <View style={styles.divider} />

      {/* Tab Bar */}
      <View style={styles.tabBarWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBar}
        >
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabItem,
                activeTab === tab.key && styles.tabItemActive,
              ]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === tab.key && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.tabDivider} />

      {/* Notification List */}
      {filteredNotifications.length === 0 ? (
        <NotificationsEmpty />
      ) : (
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.notificationCard}>
              {/* Avatar with icon overlay */}
              <View style={styles.avatarContainer}>
                <item.avatar width={64} height={64} style={styles.avatarImg} />
                
              </View>
              {/* Content */}
              <View style={styles.notificationContent}>
                <View style={styles.titleRow}>
                  <Text style={styles.notificationTitle}>{item.title}</Text>
                  <Text style={styles.notificationTime}>{item.time}</Text>
                </View>
                {item.message && (
                  <Text style={styles.notificationMessage} numberOfLines={1}>{item.message}</Text>
                )}
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>{item.action}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: color.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 45,
    paddingBottom: 8,
    backgroundColor: color.white,
  },
  headerTitle: {
    fontFamily: font.regular,
    fontSize: 15,
    color: color.black,
    flex: 1,
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: color.gray100,
  },
  tabBarWrap: {
    backgroundColor: '#fff',
    marginTop: 8,
    marginBottom: 5,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 0,
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    alignItems: 'center',
    marginRight: 10,
    minWidth: 90,
    justifyContent: 'center',
  },
  tabItemActive: {
    backgroundColor: '#FF0000',
    borderWidth: 0,
  },
  tabLabel: {
    fontFamily: font.regular,
    fontSize: 14,
    color: color.gray400,
  },
  tabLabelActive: {
    color: '#fff',
    fontFamily: font.semiBold,
  },
  tabDivider: {
    height: 1,
    backgroundColor: color.gray100,
    marginBottom: 2,
  },
  listContent: {
    padding: 12,
    paddingBottom: 32,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'visible',
    marginRight: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarImg: {
    borderRadius: 32,
  },
  iconOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 1,
  },
  notificationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  notificationTitle: {
    fontFamily: font.semiBold,
    fontSize: 14,
    color: color.black,
    flex: 1,
    marginRight: 8,
  },
  notificationTime: {
    fontFamily: font.regular,
    fontSize: 13,
    color: color.gray300,
    marginLeft: 8,
  },
  notificationMessage: {
    fontFamily: font.regular,
    fontSize: 14,
    color: color.gray400,
    marginBottom: 10,
    marginTop: 2,
  },
  actionButton: {
    alignSelf: 'flex-start',
    borderWidth: 1.5,
    borderColor: color.primary,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: 2,
  },
  actionButtonText: {
    color: color.primary,
    fontFamily: font.semiBold,
    fontSize: 15,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  bellCircle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: color.gray100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  emptyTitle: {
    fontFamily: font.semiBold,
    fontSize: 20,
    color: color.black,
    marginBottom: 12,
    textAlign: "center",
  },
  emptyDesc: {
    fontFamily: font.regular,
    fontSize: 15,
    color: color.gray300,
    textAlign: "center",
    lineHeight: 22,
  },
});
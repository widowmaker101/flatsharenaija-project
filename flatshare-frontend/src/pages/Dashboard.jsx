import { motion } from 'framer-motion'
import NotificationCenter from '../components/NotificationCenter'
import SavedSearches from '../components/SavedSearches'
import SettingsPanel from '../components/SettingsPanel'
import Favorites from '../components/Favorites'
import FlatmateMatch from '../components/RoommateMatch'
import GroupChat from '../components/GroupChat'
import SharedCalendar from '../components/SharedCalendar'
import TaskManager from '../components/TaskManager'
import BudgetTracker from '../components/BudgetTracker'
import AnalyticsDashboard from '../components/AnalyticsDashboard'
import ProfileInsights from '../components/ProfileInsights'
import RecommendationEngine from '../components/RecommendationEngine'
import NotificationPreferences from '../components/NotificationPreferences'
import ActivityLog from '../components/ActivityLog'
import VotingSystem from '../components/VotingSystem'
import ShoppingList from '../components/ShoppingList'
import MaintenanceRequests from '../components/MaintenanceRequests'
import HouseRules from '../components/HouseRules'
import GuestManagement from '../components/GuestManagement'
import UtilitiesTracker from '../components/UtilitiesTracker'
import SecurityLog from '../components/SecurityLog'
import MealPlanner from '../components/MealPlanner'
import CleaningRota from '../components/CleaningRota'
import ReimbursementSystem from '../components/ReimbursementSystem'
import InventorySystem from '../components/InventorySystem'
import EventsBoard from '../components/EventsBoard'
import LibrarySystem from '../components/LibrarySystem'
import TransportSystem from '../components/TransportSystem'
import AnnouncementsBoard from '../components/AnnouncementsBoard'
import EmergencyContacts from '../components/EmergencyContacts'
import RepairLog from '../components/RepairLog'
import WishlistBoard from '../components/WishlistBoard'

export default function Dashboard({ profile, setProfile }) {
  return (
    <motion.div className="p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">🏠 Your Dashboard</h1>

      {profile ? (
        <div className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3"><img src={profile.avatar} alt="Avatar" className="w-12 h-12 rounded-full border shadow-md"/><h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Welcome back, {profile.name} 👋</h2></div></h2>
          <p className="text-gray-700 dark:text-gray-300">City: <span className="font-medium">{profile.city}</span></p>
          <p className="text-gray-700 dark:text-gray-300">Preferences: <span className="font-medium">{profile.preferences}</span></p>
        </div>
      ) : (
        <p className="text-gray-500 mb-8">No profile found. Complete onboarding to personalize your experience.</p>
      )}

      <Favorites />
      <SavedSearches selectedTags={[]} searchQuery={""} />
      <NotificationCenter />
      <FlatmateMatch profile={profile} />
      <GroupChat groupName="Flatshare Abuja" members={[{ name: "You", avatar: "/avatars/you.png" }, { name: "Ada", avatar: "/avatars/ada.png" }, { name: "Emeka", avatar: "/avatars/emeka.png" }]} />
      <SharedCalendar />
      <TaskManager />
      <BudgetTracker />
      <AnalyticsDashboard />
      <ProfileInsights profile={profile} />
      <RecommendationEngine profile={profile} />
      <NotificationPreferences />
      <ActivityLog />
      <VotingSystem />
      <ShoppingList />
      <MaintenanceRequests />
      <HouseRules />
      <GuestManagement />
      <UtilitiesTracker />
      <SecurityLog />
      <MealPlanner />
      <CleaningRota />
      <ReimbursementSystem />
      <InventorySystem />
      <EventsBoard />
      <LibrarySystem />
      <TransportSystem />
      <AnnouncementsBoard />
      <EmergencyContacts />
      <RepairLog />
      <WishlistBoard />
      <SettingsPanel profile={profile} setProfile={setProfile} />
    </motion.div>
  )
}

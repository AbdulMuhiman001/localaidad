import CloseIcon from "@/assets/images/close.svg";
import CoinIcon from "@/assets/images/coin.svg";
import BackIcon from "@/assets/images/left arrow.svg";
import TickIcon from "@/assets/images/review icon.svg";
import { font } from "@/utils/constants";
import React, { useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const misleadingIssues = [
  "Offensive Language",
  "Abuse & Harassment",
  "Intrusive Advertising",
  "Sensitive or Disturbing Media",
  "Potential Spam or Suspicious Content",
];

const factualIssues = [
  "Hate Speech",
  "Explicit Threats",
  "Child Exploitation",
  "Terrorism and Extremism",
  "Fraud and Scams",
  "Privacy Violations",
  "Copyright Infringement or Explicit Content",
];

const warningText = {
  Harmful: "Selecting 'Harmful' will reduce the visibility time of this post. Please use this feature responsibly. Misuse or consistently opposing majority ratings can negatively impact your account.",
  Illegal: "Labeling content as 'Illegal' will significantly reduce the visibility time of this post. Ensure your rating is accurate. Misuse or deviations from the community consensus can lead to penalties on your account.",
};

interface PostReviewModalProps {
  visible: boolean;
  onClose: () => void;
}

const PostReviewModal: React.FC<PostReviewModalProps> = ({ visible, onClose }) => {
  const [step, setStep] = useState<'misleading' | 'factual' | 'done'>('misleading');
  const [accuracy, setAccuracy] = useState<'Misleading' | 'Factual'>('Misleading');
  const [credibility, setCredibility] = useState<'Fabricated' | 'Out of context' | 'Verified Source' | 'Unverified Source'>('Fabricated');
  const [risk, setRisk] = useState<'Illegal' | 'Harmful' | 'Safe'>('Harmful');
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);

  const handleCheckbox = (issue: string) => {
    setSelectedIssues(prev =>
      prev.includes(issue) ? prev.filter(i => i !== issue) : [...prev, issue]
    );
  };

  const handleSubmit = () => {
    setStep('done');
  };

  const handleBack = () => {
    if (step === 'factual') {
      setStep('misleading');
      setAccuracy('Misleading');
      setCredibility('Fabricated');
      setRisk('Harmful');
      setSelectedIssues([]);
    }
  };

  // Step content
  let content;
  if (step === 'done') {
    content = (
      <View style={styles.doneContainer}>
        <View style={{ alignItems: 'center' }}>
          <TickIcon width={56} height={56} />
        </View>
        <Text style={styles.doneTitle}>Rating successfully submitted.</Text>
        <Text style={styles.doneDesc}>
          Thank you for fact-checking. Accurate contributions help others trust what they see.
        </Text>
        <View style={styles.coinRow}>
          <CoinIcon width={22} height={22} />
          <Text style={styles.coinText}>You&apos;ve earned <Text style={{ color: '#FF2558',fontFamily:font.regular }}>+25 social score points</Text></Text>
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={onClose}>
          <Text style={styles.submitText}>Got it</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    const isMisleading = step === 'misleading';
    content = (
      <ScrollView style={{ maxHeight: 500 }}>
        {/* Accuracy */}
        <Text style={styles.label}>Accuracy</Text>
        <View style={styles.switchRow}>
          <TouchableOpacity
            style={[styles.switchBtn, accuracy === 'Misleading' && styles.switchActive]}
            onPress={() => {
              setAccuracy('Misleading');
              setStep('misleading');
            }}
          >
            <Text style={[styles.switchText, accuracy === 'Misleading' && styles.switchTextActive]}>Misleading</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.switchBtn, accuracy === 'Factual' && styles.switchActive]}
            onPress={() => {
              setAccuracy('Factual');
              setStep('factual');
            }}
          >
            <Text style={[styles.switchText, accuracy === 'Factual' && styles.switchTextActive]}>Factual</Text>
          </TouchableOpacity>
        </View>

        {/* Source Credibility */}
        <Text style={styles.label}>Source Credibility</Text>
        <View style={styles.switchRow}>
          {isMisleading ? (
            <>
              <TouchableOpacity
                style={[styles.switchBtn, credibility === 'Fabricated' && styles.switchActive]}
                onPress={() => setCredibility('Fabricated')}
              >
                <Text style={[styles.switchText, credibility === 'Fabricated' && styles.switchTextActive]}>Fabricated</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.switchBtn, credibility === 'Out of context' && styles.switchActive]}
                onPress={() => setCredibility('Out of context')}
              >
                <Text style={[styles.switchText, credibility === 'Out of context' && styles.switchTextActive]}>Out of context</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.switchBtn, credibility === 'Verified Source' && styles.switchActive]}
                onPress={() => setCredibility('Verified Source')}
              >
                <Text style={[styles.switchText, credibility === 'Verified Source' && styles.switchTextActive]}>Verified Source</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.switchBtn, credibility === 'Unverified Source' && styles.switchActive]}
                onPress={() => setCredibility('Unverified Source')}
              >
                <Text style={[styles.switchText, credibility === 'Unverified Source' && styles.switchTextActive]}>Unverified Source</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Content Risk Level */}
        <Text style={styles.label}>Select Content Risk Level</Text>
        <View style={styles.switchRow}>
          <TouchableOpacity
            style={[styles.switchBtn, risk === 'Illegal' && styles.switchActive]}
            onPress={() => setRisk('Illegal')}
          >
            <Text style={[styles.switchText, risk === 'Illegal' && styles.switchTextActive]}>Illegal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.switchBtn, risk === 'Harmful' && styles.switchActive]}
            onPress={() => setRisk('Harmful')}
          >
            <Text style={[styles.switchText, risk === 'Harmful' && styles.switchTextActive]}>Harmful</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.switchBtn, risk === 'Safe' && styles.switchActive]}
            onPress={() => setRisk('Safe')}
          >
            <Text style={[styles.switchText, risk === 'Safe' && styles.switchTextActive]}>Safe</Text>
          </TouchableOpacity>
        </View>
        {/* Warning */}
        {(risk === 'Harmful' || risk === 'Illegal') && (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>{warningText[risk]}</Text>
          </View>
        )}

        {/* Issues */}
        <Text style={styles.label}>Choose the Most Relevant Issue</Text>
        {(isMisleading ? misleadingIssues : factualIssues).map(issue => (
          <TouchableOpacity
            key={issue}
            style={styles.checkboxRow}
            onPress={() => handleCheckbox(issue)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, selectedIssues.includes(issue) && styles.checkboxChecked]}>
              {selectedIssues.includes(issue) && <View style={styles.checkboxDot} />}
            </View>
            <Text style={styles.checkboxLabel}>{issue}</Text>
          </TouchableOpacity>
        ))}

        {/* Submit */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.headerRow}>
            {step !== 'misleading' ? (
              <TouchableOpacity onPress={handleBack} style={styles.iconBtn}>
                <BackIcon width={22} height={22} />
              </TouchableOpacity>
            ) : <View style={{ width: 22 }} />}
            <Text style={styles.headerTitle}>Rate this post</Text>
            <TouchableOpacity onPress={onClose} style={styles.iconBtn}>
              <CloseIcon width={22} height={22} />
            </TouchableOpacity>
          </View>
          {content}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    width: '100%',
    padding: 0,
    paddingBottom: 32,
    overflow: 'hidden',
    position: 'relative',
    bottom: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontFamily: font.regular,
    fontSize: 17,
    color: '#222',
    textAlign: 'center',
    flex: 1,
  },
  iconBtn: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: font.regular,
    fontSize: 14,
    color: '#222',
    marginTop: 18,
    marginBottom: 8,
    marginLeft: 18,
  },
  switchRow: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginHorizontal: 18,
    marginBottom: 8,
    padding: 4,
  },
  switchBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  switchText: {
    fontFamily: font.semiBold,
    fontSize: 14,
    color: '#888',
  },
  switchTextActive: {
    color: '#222',
  },
  warningBox: {
    backgroundColor: '#FFE6E6',
    borderRadius: 10,
    marginHorizontal: 18,
    marginVertical: 8,
    padding: 10,
  },
  warningText: {
    color: '#B00020',
    fontSize: 13,
    fontFamily: font.regular,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 18,
    marginBottom: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D1D1D1',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    borderColor: '#FF2558',
    backgroundColor: '#FFEDF2',
  },
  checkboxDot: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: '#FF2558',
  },
  checkboxLabel: {
    fontFamily: font.regular,
    fontSize: 15,
    color: '#222',
  },
  submitBtn: {
    backgroundColor: '#111',
    borderRadius: 12,
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitText: {
    fontFamily: font.semiBold,
    fontSize: 16,
    color: '#fff',
  },
  doneContainer: {
    padding: 10,
    paddingTop: 30,
  },
  doneTitle: {
    fontFamily: font.semiBold,
    fontSize: 18,
    color: '#222',
    marginTop: 18,
    marginBottom: 14,
    textAlign: 'center',
  },
  doneDesc: {
    fontFamily: font.regular,
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    marginBottom: 22,
  },
  coinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    left: "10%",
    marginBottom: 18,
  },
  coinText: {
    fontFamily: font.regular,
    fontSize: 15,
    color: '#222',
    marginLeft: 8,
  },
});

export default PostReviewModal; 
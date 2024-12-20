import type {OnyxValue} from 'react-native-onyx';
import type ONYXKEYS from '@src/ONYXKEYS';
import {isEmptyObject} from '@src/types/utils/EmptyObject';

/**
 * Selector to get the value of hasCompletedGuidedSetupFlow from the Onyx store
 *
 * `undefined` means the value is not loaded yet
 * `true` means the user has completed the NewDot onboarding flow
 * `false` means the user has not completed the NewDot onboarding flow
 */
function hasCompletedGuidedSetupFlowSelector(onboarding: OnyxValue<typeof ONYXKEYS.NVP_ONBOARDING>): boolean | undefined {
    // Onboarding is an empty object for old accounts and accounts migrated from OldDot
    if (Array.isArray(onboarding) || isEmptyObject(onboarding)) {
        return true;
    }

    if (!isEmptyObject(onboarding) && onboarding?.hasCompletedGuidedSetupFlow === undefined) {
        return true;
    }

    return onboarding?.hasCompletedGuidedSetupFlow;
}

/**
 * Selector to get the value of completedHybridAppOnboarding from the Onyx store
 *
 * `undefined` means the value is not loaded yet
 * `true` means the user has completed the hybrid app onboarding flow
 * `false` means the user has not completed the hybrid app onboarding flow
 */
function hasCompletedHybridAppOnboardingFlowSelector(tryNewDotData: OnyxValue<typeof ONYXKEYS.NVP_TRYNEWDOT>): boolean | undefined {
    let completedHybridAppOnboarding = tryNewDotData?.classicRedirect?.completedHybridAppOnboarding;

    // Backend might return strings instead of booleans
    if (typeof completedHybridAppOnboarding === 'string') {
        completedHybridAppOnboarding = completedHybridAppOnboarding === 'true';
    }

    return completedHybridAppOnboarding;
}

/**
 * Selector to get the value of selfTourViewed from the Onyx store
 *
 * `undefined` means the value is not loaded yet
 * `true` means the user has completed the NewDot onboarding flow
 * `false` means the user has not completed the NewDot onboarding flow
 */
function hasSeenTourSelector(onboarding: OnyxValue<typeof ONYXKEYS.NVP_ONBOARDING>): boolean | undefined {
    if (Array.isArray(onboarding) || isEmptyObject(onboarding)) {
        return false;
    }

    return !!onboarding?.selfTourViewed;
}

export {hasCompletedGuidedSetupFlowSelector, hasCompletedHybridAppOnboardingFlowSelector, hasSeenTourSelector};

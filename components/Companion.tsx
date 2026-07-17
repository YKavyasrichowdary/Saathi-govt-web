import Section from "./Section";
import Eyebrow from "./Eyebrow";
import ChatBubble from "./ChatBubble";
import Stat from "./Stat";

import {
  Check,
  MessageCircleHeart,
} from "lucide-react";

export default function Companion() {
  return (
    <Section className="py-28 md:py-36">
      <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16">

        {/* Left Side */}

        <div>
          <Eyebrow>The companion</Eyebrow>

          <h2 className="text-display mt-4 text-[40px] md:text-[56px]">
            Calm.
            <br />
            Contextual.
            <br />
            <span className="text-primary">
              Always with you.
            </span>
          </h2>

          <p className="mt-6 text-[17px] leading-relaxed text-muted-foreground">
            Saathi remembers your goals,
            deadlines and progress.
            Not just another chatbot—
            a companion that truly
            stays with you.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "Understands your goal, not just your question.",
              "Knows what's due, what's next and what's missing.",
              "Adjusts your roadmap whenever life changes.",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[15px]"
              >
                <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                  <Check className="h-3 w-3" />
                </span>

                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side */}

        <div className="surface-card overflow-hidden">

          <div className="border-b border-border bg-gradient-to-r from-[var(--sky-soft)]/60 to-[var(--mint-soft)]/60 px-5 py-3">

            <div className="flex items-center gap-3">

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MessageCircleHeart className="h-4 w-4" />
              </span>

              <div>
                <h4 className="text-sm font-semibold">
                  Today with SAATHI
                </h4>

                <p className="text-xs text-muted-foreground">
                  Wednesday · 8:04 AM
                </p>
              </div>

            </div>

          </div>

          <div className="space-y-3 p-6">

            <ChatBubble>
              Good morning.
              You're <b>82% ready</b> for NSP.
            </ChatBubble>

            <ChatBubble tone="gold">
              Your income certificate expires next month.
            </ChatBubble>

            <ChatBubble tone="mint">
              Today's mock test is ready —
              Quantitative Aptitude.
            </ChatBubble>

            <ChatBubble>
              I found <b>12 scholarships</b>
              matching your profile.
            </ChatBubble>

            <div className="mt-6 grid grid-cols-3 gap-3">

              <Stat
                label="Streak"
                value="14 days"
                tone="gold"
              />

              <Stat
                label="Readiness"
                value="82%"
                tone="sky"
              />

              <Stat
                label="Deadlines"
                value="3 this wk"
                tone="mint"
              />

            </div>

          </div>

        </div>

      </div>
    </Section>
  );
}

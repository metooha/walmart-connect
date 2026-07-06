import { useState } from 'react';
import { Panel } from '@/components/ui/Panel';
import { RecommendationsContent } from '@/components/recommendations/RecommendationsContent';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Link } from '@/components/ui/Link';
import { LinkButton } from '@/components/ui/LinkButton';
import { Tag } from '@/components/ui/Tag';
import { useTranslation } from 'react-i18next';
import { Divider } from '@/components/ui/Divider';
import { Select, SelectItem } from '@/components/ui/Select';
import { Tabs, TabList, Tab, TabPanel } from '@/components/ui/Tab';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function DisplayDashboard() {
  const { t } = useTranslation();
  const [activeRecommendationTab, setActiveRecommendationTab] = useState('active');
  const [topPerformingTab, setTopPerformingTab] = useState('campaigns');
  const [buyerType, setBuyerType] = useState('Overall');
  const [buyerTypeOpen, setBuyerTypeOpen] = useState(false);
  const [recommendationsPanelOpen, setRecommendationsPanelOpen] = useState(false);
  const [campaignGoal, setCampaignGoal] = useState<string>('Awareness');
  const [viewMoreModalOpen, setViewMoreModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'applied' | 'dismissed'>('applied');
  const [attributionWindow, setAttributionWindow] = useState('14-day');
  const [dateRange, setDateRange] = useState('oct-2025');

  return (
    <div className="flex-1 overflow-y-auto bg-muted">
      {/* Page Header */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between gap-4 mb-1">
          <h1 className="text-[32px] font-bold text-foreground leading-[40px]">{t('header.greeting', { name: 'Gabriela' })}</h1>
        </div>
      </div>

      <div className="px-6 pb-6 flex flex-col gap-6">
        {/* Recommendations */}
        <div className="flex flex-col gap-4 bg-background rounded-xl shadow-[var(--ld-semantic-elevation-100,0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15))] p-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#F3D4F7"/>
                <path d="M22.5 12.5L15.625 21.25H21.25L20 27.5L26.875 18.75H21.25L22.5 12.5Z" fill="#6F2C7A" stroke="#6F2C7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h2 className="text-lg font-bold text-foreground">{t('header.recommendations')}</h2>
            </div>
            <p className="text-sm text-foreground">{t('header.discoverOpportunities')}</p>
          </div>

          {/* Conditional Content - Cards or Table */}
          {activeRecommendationTab === 'active' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 - Awareness */}
            <div className="flex flex-col bg-background rounded-lg border border-border py-4 px-6">
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag variant="tertiary" color="blue" leading={
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 3C4.5 3 1.73 5.11 1 8C1.73 10.89 4.5 13 8 13C11.5 13 14.27 10.89 15 8C14.27 5.11 11.5 3 8 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 7C6 8.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }>{t('goals.awareness')}</Tag>
                  <span className="text-base text-foreground">{t('goals.awarenessDesc')}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[18px] leading-[24px]">
                    <span className="font-bold text-walmart-green text-[18px]">45k-48k</span>
                    <span className="font-bold text-foreground text-[18px]"> {t('dashboard.potentialIncreaseImpressions')}</span>
                  </div>
                  <p className="text-base text-muted-foreground">
                    {t('header.recommendationsAvailable', { count: 8 })}
                  </p>
                </div>
              </div>

              <div className="border-t border-border -mx-6 my-4"></div>

              <div className="flex items-center justify-end">
                <Button
                  onClick={() => {
                    setCampaignGoal('Awareness');
                    setRecommendationsPanelOpen(true);
                  }}
                  variant="secondary"
                  size="small"
                >
                  {t('header.review')}
                </Button>
              </div>
            </div>

            {/* Card 2 - Engagement */}
            <div className="flex flex-col bg-background rounded-lg border border-border py-4 px-6">
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag variant="tertiary" color="purple" leading={
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="8" cy="8" r="2" fill="currentColor"/>
                      <path d="M12.5 3.5L10 6M12.5 3.5L14 2M12.5 3.5L11 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }>{t('goals.engagement')}</Tag>
                  <span className="text-base text-foreground">{t('goals.engagementDesc')}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[18px] leading-[24px]">
                    <span className="font-bold text-walmart-green text-[18px]">0.8%-1.2%</span>
                    <span className="font-bold text-foreground text-[18px]"> {t('dashboard.potentialIncreaseClicks')}</span>
                  </div>
                  <p className="text-base text-muted-foreground">
                    {t('header.recommendationsAvailable', { count: 14 })}
                  </p>
                </div>
              </div>

              <div className="border-t border-border -mx-6 my-4"></div>

              <div className="flex items-center justify-end">
                <Button
                  onClick={() => {
                    setCampaignGoal('Engagement');
                    setRecommendationsPanelOpen(true);
                  }}
                  variant="secondary"
                  size="small"
                >
                  {t('header.review')}
                </Button>
              </div>
            </div>

            {/* Card 3 - Conversion */}
            <div className="flex flex-col bg-background rounded-lg border border-border py-4 px-6">
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag variant="tertiary" color="orange" leading={
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M8 4V12M8 4C8.66667 4 10 4.4 10 5.6C10 6.8 8.66667 7.2 8 7.2M8 4C7.33333 4 6 4.4 6 5.6C6 6.8 7.33333 7.2 8 7.2M8 12C7.33333 12 6 11.6 6 10.4C6 9.2 7.33333 8.8 8 8.8M8 12C8.66667 12 10 11.6 10 10.4C10 9.2 8.66667 8.8 8 8.8M8 7.2V8.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  }>{t('goals.conversion')}</Tag>
                  <span className="text-base text-foreground">{t('goals.conversionDesc')}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[18px] leading-[24px]">
                    <span className="font-bold text-walmart-green text-[18px]">15%-18%</span>
                    <span className="font-bold text-foreground text-[18px]"> {t('dashboard.potentialIncreaseTransactions')}</span>
                  </div>
                  <p className="text-base text-muted-foreground">
                    {t('header.recommendationsAvailable', { count: 10 })}
                  </p>
                </div>
              </div>

              <div className="border-t border-border -mx-6 my-4"></div>

              <div className="flex items-center justify-end">
                <Button
                  onClick={() => {
                    setCampaignGoal('Conversion');
                    setRecommendationsPanelOpen(true);
                  }}
                  variant="secondary"
                  size="small"
                >
                  {t('header.review')}
                </Button>
              </div>
            </div>
          </div>
          )}

          {/* Applied Recommendations Table */}
          {activeRecommendationTab === 'applied' && (
            <div className="flex flex-col gap-2">
              {/* Table */}
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr className="border-t border-b border-border">
                      <th className="px-4 py-3 text-left font-bold text-foreground text-sm">{t('recommendations.recommendation')}</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground text-sm">{t('filters.type')}</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground text-sm">{t('recommendations.dateApplied')}</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground text-sm">{t('recommendations.impact')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Reallocate budget across ad groups</span>
                          <span className="text-xs text-muted-foreground">Campaign name 01</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">Budget</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">01/20/2026</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.impressions')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">35k</span>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Add 15 keywords</span>
                          <span className="text-xs text-muted-foreground">Campaign name 02</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">Targeting</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">01/20/2026</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.clicks')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">2.5%</span>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Add 7 categories</span>
                          <span className="text-xs text-muted-foreground">Campaign name 02</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">Targeting</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">01/20/2026</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.transactions')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">15%</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* View more link */}
              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalTab('applied');
                    setViewMoreModalOpen(true);
                  }}
                >
                  {t('actions.viewMore')}
                </Link>
              </div>
            </div>
          )}

          {/* Dismissed Recommendations Table */}
          {activeRecommendationTab === 'dismissed' && (
            <div className="flex flex-col gap-2">
              {/* Table */}
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr className="border-t border-b border-border">
                      <th className="px-4 py-3 text-left font-bold text-foreground text-sm">{t('recommendations.recommendation')}</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground text-sm">{t('filters.type')}</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground text-sm">{t('recommendations.impact')}</th>
                      <th className="px-4 py-3 text-right font-bold text-foreground text-sm">{t('recommendations.action')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Reallocate budget across ad groups</span>
                          <span className="text-xs text-muted-foreground">Campaign name 01</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">Budget</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.impressions')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">27k–35k</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Link href="#" className="inline-flex items-center gap-2 text-sm" onClick={(e) => e.preventDefault()}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00003 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8.00003 2C5.8279 2 3.92536 3.15424 2.8723 4.88282L4.50003 4.88281L4.50004 5.88281L1.50001 5.88284C1.3674 5.88284 1.24022 5.83016 1.14645 5.73639C1.05268 5.64262 1 5.51544 1 5.38283L1.00003 2.49901L2.00003 2.49902L2.00001 4.39245C3.2249 2.3596 5.45369 1 8.00003 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8.00003 15C4.13404 15 1.00003 11.866 1.00003 8L2.00003 8.00007C2.00007 11.3137 4.68634 14 8.00003 14Z" fill="currentColor"/>
                            <path d="M8.05862 4H7.05862V8.8297L10.8617 10.4596L11.2556 9.54043L8.05862 8.1703V4Z" fill="currentColor"/>
                          </svg>
                          {t('recommendations.restore')}
                        </Link>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Add 15 keywords</span>
                          <span className="text-xs text-muted-foreground">Campaign name 02</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">Targeting</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.clicks')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">2.1%–2.5%</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Link href="#" className="inline-flex items-center gap-2 text-sm" onClick={(e) => e.preventDefault()}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00003 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8.00003 2C5.8279 2 3.92536 3.15424 2.8723 4.88282L4.50003 4.88281L4.50004 5.88281L1.50001 5.88284C1.3674 5.88284 1.24022 5.83016 1.14645 5.73639C1.05268 5.64262 1 5.51544 1 5.38283L1.00003 2.49901L2.00003 2.49902L2.00001 4.39245C3.2249 2.3596 5.45369 1 8.00003 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8.00003 15C4.13404 15 1.00003 11.866 1.00003 8L2.00003 8.00007C2.00007 11.3137 4.68634 14 8.00003 14Z" fill="currentColor"/>
                            <path d="M8.05862 4H7.05862V8.8297L10.8617 10.4596L11.2556 9.54043L8.05862 8.1703V4Z" fill="currentColor"/>
                          </svg>
                          {t('recommendations.restore')}
                        </Link>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Add 7 categories</span>
                          <span className="text-xs text-muted-foreground">Campaign name 02</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">Targeting</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.transactions')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">13%–15%</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Link href="#" className="inline-flex items-center gap-2 text-sm" onClick={(e) => e.preventDefault()}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00003 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8.00003 2C5.8279 2 3.92536 3.15424 2.8723 4.88282L4.50003 4.88281L4.50004 5.88281L1.50001 5.88284C1.3674 5.88284 1.24022 5.83016 1.14645 5.73639C1.05268 5.64262 1 5.51544 1 5.38283L1.00003 2.49901L2.00003 2.49902L2.00001 4.39245C3.2249 2.3596 5.45369 1 8.00003 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8.00003 15C4.13404 15 1.00003 11.866 1.00003 8L2.00003 8.00007C2.00007 11.3137 4.68634 14 8.00003 14Z" fill="currentColor"/>
                            <path d="M8.05862 4H7.05862V8.8297L10.8617 10.4596L11.2556 9.54043L8.05862 8.1703V4Z" fill="currentColor"/>
                          </svg>
                          {t('recommendations.restore')}
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* View more link */}
              <div className="flex justify-end">
                <Link
                  href="#"
                  className="text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalTab('dismissed');
                    setViewMoreModalOpen(true);
                  }}
                >
                  {t('actions.viewMore')}
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <Select
            label={t('filters.attributionWindow')}
            value={attributionWindow}
            onValueChange={setAttributionWindow}
            size="small"
          >
            <SelectItem value="1-day">{t('filters.1dayAttribution')}</SelectItem>
            <SelectItem value="7-day">{t('filters.7dayAttribution')}</SelectItem>
            <SelectItem value="14-day">{t('filters.14dayAttribution')}</SelectItem>
            <SelectItem value="28-day">{t('filters.28dayAttribution')}</SelectItem>
          </Select>
          <Select
            label={t('filters.dateRange')}
            value={dateRange}
            onValueChange={setDateRange}
            size="small"
          >
            <SelectItem value="last-7">{t('filters.last7Days')}</SelectItem>
            <SelectItem value="last-30">{t('filters.last30Days')}</SelectItem>
            <SelectItem value="oct-2025">Oct 1, 2025 - Oct 31, 2025</SelectItem>
            <SelectItem value="sep-2025">Sep 1, 2025 - Sep 30, 2025</SelectItem>
            <SelectItem value="q4-2025">Q4 2025</SelectItem>
          </Select>
        </div>

        {/* Metrics Ribbon */}
        <div className="flex flex-wrap items-stretch bg-background rounded-lg shadow-[var(--ld-semantic-elevation-100,0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15))] gap-4 p-2 min-h-[88px]">
          {/* Impressions */}
          <div className="flex-1 flex items-center min-w-[180px]">
            <div className="flex-1 bg-background rounded px-2 py-1">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm text-foreground">{t('metrics.impressions')}</span>
                <IconButton aria-label="View impressions information" variant="ghost" size="small">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="currentColor"/>
                    <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="currentColor"/>
                    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="currentColor"/>
                  </svg>
                </IconButton>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-foreground">21,891,371</span>
                <div className="flex items-center gap-0.5 text-walmart-green pt-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                  </svg>
                  <span className="text-sm">6%</span>
                </div>
              </div>
            </div>
          </div>

          {/* eCPM */}
          <div className="flex-1 flex items-center min-w-[180px]">
            <div className="flex-1 bg-background rounded px-2 py-1">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm text-foreground">{t('metrics.ecpm')}</span>
                <IconButton aria-label="View eCPM information" variant="ghost" size="small">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="currentColor"/>
                    <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="currentColor"/>
                    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="currentColor"/>
                  </svg>
                </IconButton>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-foreground">$5.52</span>
                <div className="flex items-center gap-0.5 text-walmart-green pt-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8.50003 13.2929L12.1465 9.64648L12.8536 10.3536L8.35359 14.8536C8.15833 15.0489 7.84175 15.0489 7.64648 14.8536L3.14648 10.3536L3.85359 9.64648L7.50003 13.2929V1H8.50003V13.2929Z" fill="currentColor"/>
                  </svg>
                  <span className="text-sm">1%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Spend */}
          <div className="flex-1 flex items-center min-w-[180px]">
            <div className="flex-1 bg-background rounded px-2 py-1">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm text-foreground">{t('metrics.spend')}</span>
                <IconButton aria-label="View spend information" variant="ghost" size="small">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="currentColor"/>
                    <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="currentColor"/>
                    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="currentColor"/>
                  </svg>
                </IconButton>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-foreground">$120,869</span>
                <div className="flex items-center gap-0.5 text-foreground pt-2">
                  <span className="text-sm">0%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Total ROAS */}
          <div className="flex-1 flex items-center min-w-[180px]">
            <div className="flex-1 bg-background rounded px-2 py-1">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm text-foreground">{t('metrics.totalRoas')}</span>
                <IconButton aria-label="View Total ROAS information" variant="ghost" size="small">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="currentColor"/>
                    <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="currentColor"/>
                    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="currentColor"/>
                  </svg>
                </IconButton>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-foreground">$3.13</span>
                <div className="flex items-center gap-0.5 text-walmart-green pt-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                  </svg>
                  <span className="text-sm">1%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Total attributed sales */}
          <div className="flex-1 flex items-center min-w-[200px]">
            <div className="flex-1 bg-background rounded px-2 py-1">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm text-foreground">{t('metrics.totalAttributedSales')}</span>
                <IconButton aria-label="View Total attributed sales information" variant="ghost" size="small">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="currentColor"/>
                    <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="currentColor"/>
                    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="currentColor"/>
                  </svg>
                </IconButton>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-foreground">$377,588</span>
                <div className="flex items-center gap-0.5 text-walmart-green pt-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                  </svg>
                  <span className="text-sm">3%</span>
                </div>
              </div>
            </div>
          </div>

          <Divider orientation="vertical" UNSAFE_className="hidden sm:block" />

          {/* Total attributed transactions */}
          <div className="flex-1 flex items-center min-w-[200px]">
            <div className="flex-1 bg-background rounded px-2 py-1">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm text-foreground">{t('metrics.totalAttributedTransactions')}</span>
                <IconButton aria-label="View Total attributed transactions information" variant="ghost" size="small">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="currentColor"/>
                    <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="currentColor"/>
                    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="currentColor"/>
                  </svg>
                </IconButton>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-foreground">30,666</span>
                <div className="flex items-center gap-0.5 text-walmart-green pt-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                  </svg>
                  <span className="text-sm">4%</span>
                </div>
              </div>
            </div>
          </div>

          <Divider orientation="vertical" UNSAFE_className="hidden sm:block" />

          {/* Total attributed units */}
          <div className="flex-1 flex items-center min-w-[200px]">
            <div className="flex-1 bg-background rounded px-2 py-1">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm text-foreground">{t('metrics.totalAttributedUnits')}</span>
                <IconButton aria-label="View Total attributed units information" variant="ghost" size="small">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M7.40039 7H8.60039V11.5H7.40039V7Z" fill="currentColor"/>
                    <path d="M7.99961 6.3C8.49667 6.3 8.89961 5.89706 8.89961 5.4C8.89961 4.90294 8.49667 4.5 7.99961 4.5C7.50255 4.5 7.09961 4.90294 7.09961 5.4C7.09961 5.89706 7.50255 6.3 7.99961 6.3Z" fill="currentColor"/>
                    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14Z" fill="currentColor"/>
                  </svg>
                </IconButton>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-foreground">21,891,371</span>
                <div className="flex items-center gap-0.5 text-walmart-green pt-2">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                  </svg>
                  <span className="text-sm">2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_562px] gap-6">
          {/* Performance Summary Chart */}
          <div className="bg-background rounded-lg shadow-[var(--ld-semantic-elevation-100,0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15))] overflow-hidden">
            <div className="px-6 pt-6 pb-0">
              <h3 className="text-lg font-bold text-foreground mb-1">{t('charts.performanceSummary')}</h3>
              <p className="text-sm text-foreground mb-6">{t('charts.performanceSummaryDesc')}</p>
            </div>
            <div className="px-6 pb-6 mb-6">
              {/* Chart Legend */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0053E2] border border-[#0053E2]"></div>
                  <span className="text-base text-foreground">{t('charts.totalAttributedSales')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#993EF4] border border-[#993EF4]"></div>
                  <span className="text-base text-foreground">{t('charts.totalROAS')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4DBDF5] border border-[#4DBDF5]"></div>
                  <span className="text-base text-foreground">{t('metrics.spend')}</span>
                </div>
              </div>

              {/* Chart Container */}
              <div className="relative h-[320px] pl-10 pr-16">
                {/* Y-axis labels (left) */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-right text-xs text-foreground pr-3 pb-4 w-10">
                  <span>$50K</span>
                  <span>$45K</span>
                  <span>$40K</span>
                  <span>$35K</span>
                  <span>$30K</span>
                  <span>$25K</span>
                  <span>$20K</span>
                  <span>$15K</span>
                  <span>$10K</span>
                  <span>$5K</span>
                  <span>$0.00</span>
                </div>

                {/* Y-axis labels (right - ROAS) */}
                <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between text-left text-xs text-[#993EF4] pb-4 w-12">
                  <span>$10.00</span>
                  <span>$9.00</span>
                  <span>$8.00</span>
                  <span>$7.00</span>
                  <span>$6.00</span>
                  <span>$5.00</span>
                  <span>$4.00</span>
                  <span>$3.00</span>
                  <span>$2.00</span>
                  <span>$1.00</span>
                  <span>$0.00</span>
                </div>

                {/* Chart Area */}
                <div className="relative h-full border-l border-b border-border">
                  {/* X-axis labels */}
                  <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-foreground px-2">
                    <span>Oct 4</span>
                    <span>Oct 7</span>
                    <span>Oct 10</span>
                    <span>Oct 13</span>
                    <span>Oct 16</span>
                    <span>Oct 19</span>
                    <span>Oct 22</span>
                    <span>Oct 25</span>
                    <span>Oct 28</span>
                    <span>Oct 31</span>
                  </div>

                  {/* Chart SVG */}
                  <svg className="w-full h-full pl-[5px]" viewBox="0 0 584 288" fill="none" preserveAspectRatio="none">
                    <defs>
                      <clipPath id="clip0_chart">
                        <path d="M0 0H584V288H0V0Z" fill="white"/>
                      </clipPath>
                      <linearGradient id="paint0_linear_chart" x1="311.906" y1="81.9307" x2="311.906" y2="237.699" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#4DBDF5" stopOpacity="0.12"/>
                        <stop offset="1" stopColor="#4DBDF5" stopOpacity="0"/>
                      </linearGradient>
                      <linearGradient id="paint1_linear_chart" x1="253.806" y1="88.7671" x2="253.806" y2="190.356" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#993EF4" stopOpacity="0.12"/>
                        <stop offset="1" stopColor="#993EF4" stopOpacity="0"/>
                      </linearGradient>
                      <linearGradient id="paint2_linear_chart" x1="298.528" y1="59.1782" x2="298.528" y2="287.999" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0053E2" stopOpacity="0.12"/>
                        <stop offset="1" stopColor="#0053E2" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <g clipPath="url(#clip0_chart)">
                      <path d="M104.449 224.322C50.4019 224.322 10.2535 184.666 0 174.477V237.699H584V175.987C511.973 177.921 534.234 81.2892 494.292 81.9339C454.35 82.5786 484.056 220.633 387.801 220.633C336.226 220.633 329.176 196.522 257.193 196.522C199.309 196.522 157.408 224.322 104.449 224.322Z" fill="url(#paint0_linear_chart)"/>
                      <path d="M0 174.633C10.2535 184.839 50.4019 224.562 104.449 224.562C157.408 224.562 199.309 196.715 257.193 196.715C329.176 196.715 336.226 220.867 387.801 220.867C484.056 220.867 454.35 82.5796 494.292 81.9339C534.234 81.2881 511.973 178.083 584 176.146" stroke="#4DBDF5" strokeWidth="2"/>
                      <path d="M102.051 177.658C71.3618 177.383 21.2298 118.283 0 88.7671V190.356H584V180.06C559.418 169.878 494.24 148.76 430.179 145.739C350.102 141.964 351.964 157.065 303.546 157.065C246.561 158.095 248.796 142.65 203.73 143.337C158.663 144.023 140.413 178.001 102.051 177.658Z" fill="url(#paint1_linear_chart)"/>
                      <path d="M0 88.7671C21.2298 118.214 71.3618 177.176 102.051 177.45C140.413 177.792 158.663 143.894 203.73 143.21C248.796 142.525 246.561 157.933 303.546 156.906C351.964 156.906 350.102 141.84 430.179 145.606C494.24 148.62 559.418 169.689 584 179.847" stroke="#993EF4" strokeWidth="2"/>
                      <path d="M102.761 82.2171C74.0553 42.1341 27.4994 88.8639 0 146.47V287.999H584V118.221C529.242 120.99 517.454 213.798 483.305 212.591C453.264 213.359 425.855 55.9067 387.742 59.2301C349.628 62.5535 355.259 139.269 299.599 139.269C252.56 129.853 249.907 85.5405 197.079 111.574C150.916 134.323 138.449 132.05 102.761 82.2171Z" fill="url(#paint2_linear_chart)"/>
                      <path d="M0 146.749C27.4994 88.959 74.0553 42.0797 102.761 82.2909C138.449 132.284 150.916 134.563 197.079 111.742C249.907 85.6249 252.56 130.079 299.598 139.525C356.081 139.525 349.012 62.5645 387.125 59.2305C425.238 55.8964 453.211 213.235 483.835 213.236C517.325 213.236 529.242 121.188 584 118.41" stroke="#0053E2" strokeWidth="2"/>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Buyer Analysis Chart */}
          <div className="bg-background rounded-lg shadow-[var(--ld-semantic-elevation-100,0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15))] overflow-hidden">
            <div className="px-6 pt-6 pb-0">
              <h3 className="text-lg font-bold text-foreground mb-1">{t('charts.buyerAnalysis')}</h3>
              <p className="text-sm text-foreground mb-6">{t('charts.buyerAnalysisDesc')}</p>
            </div>
            <div className="px-6 pb-6">
              {/* Filter */}
              <div className="mb-6 relative">
                <LinkButton
                  onClick={() => setBuyerTypeOpen(!buyerTypeOpen)}
                  size="small"
                  trailing={
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform ${buyerTypeOpen ? 'rotate-180' : ''}`}>
                      <path d="M8.37683 11.334L14 5.19175L13.2463 4.5L8 10.2307L2.75366 4.5L2 5.19175L7.62317 11.334C7.71999 11.4398 7.85671 11.5 8 11.5C8.14329 11.5 8.28 11.4398 8.37683 11.334Z" fill="currentColor"/>
                    </svg>
                  }
                >
                  {t('charts.buyerType', { type: buyerType })}
                </LinkButton>
              </div>

              {/* Donut Chart and Legend */}
              <div className="flex items-center gap-6">
                {/* Donut Chart */}
                <div className="relative w-[200px] h-[200px] flex-shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 308 308" fill="none">
                    <defs>
                      <mask id="segment_23" fill="white">
                        <path d="M308 154C308 68.9481 239.052 0 154 0C68.9481 0 0 68.9481 0 154C0 239.052 68.9481 308 154 308C239.052 308 308 239.052 308 154ZM61.6 154C61.6 102.969 102.969 61.6 154 61.6C205.031 61.6 246.4 102.969 246.4 154C246.4 205.031 205.031 246.4 154 246.4C102.969 246.4 61.6 205.031 61.6 154Z"/>
                      </mask>
                      <mask id="segment_9" fill="white">
                        <path d="M154 0C184.458 0 214.233 9.03194 239.558 25.9537C264.883 42.8754 284.622 66.9269 296.277 95.0667C307.933 123.207 310.983 154.171 305.041 184.044C299.099 213.917 284.432 241.357 262.894 262.894C241.357 284.432 213.917 299.099 184.044 305.041C154.171 310.983 123.207 307.933 95.0668 296.277C66.9269 284.622 42.8754 264.883 25.9537 239.558C9.03195 214.233 0 184.458 0 154L61.6 154C61.6 172.275 67.0192 190.14 77.1722 205.335C87.3253 220.53 101.756 232.373 118.64 239.366C135.524 246.36 154.103 248.19 172.026 244.625C189.95 241.059 206.414 232.259 219.337 219.337C232.259 206.414 241.059 189.95 244.625 172.026C248.19 154.102 246.36 135.524 239.366 118.64C232.373 101.756 220.53 87.3252 205.335 77.1722C190.14 67.0192 172.275 61.6 154 61.6L154 0Z"/>
                      </mask>
                      <mask id="segment_18" fill="white">
                        <path d="M154 0C180.759 0 207.057 6.97264 230.301 20.2307C253.545 33.4888 272.933 52.5748 286.554 75.6076C300.176 98.6404 307.561 124.825 307.981 151.581C308.401 178.337 301.843 204.741 288.951 228.19C276.06 251.639 257.281 271.325 234.465 285.307C211.649 299.288 185.583 307.083 158.837 307.924C132.091 308.765 105.588 302.621 81.9389 290.1C58.2899 277.578 38.3119 259.111 23.9735 236.517L75.9841 203.51C84.5871 217.067 96.574 228.147 110.763 235.66C124.953 243.173 140.855 246.859 156.902 246.354C172.95 245.85 188.589 241.173 202.279 232.784C215.968 224.395 227.236 212.584 234.971 198.514C242.706 184.444 246.641 168.602 246.389 152.549C246.136 136.495 241.706 120.784 233.533 106.965C225.36 93.1449 213.727 81.6933 199.78 73.7384C185.834 65.7836 170.056 61.6 154 61.6L154 0Z"/>
                      </mask>
                      <mask id="segment_48" fill="white">
                        <path d="M154 0C193.169 0 230.867 14.9255 259.42 41.7388C287.974 68.5521 305.237 105.238 307.696 144.33C310.156 183.422 297.627 221.983 272.659 252.163C247.692 282.344 212.162 301.876 173.301 306.786L165.581 245.671C188.897 242.726 210.215 231.006 225.195 212.898C240.176 194.79 247.693 171.653 246.218 148.198C244.742 124.743 234.384 102.731 217.252 86.6433C200.12 70.5553 177.502 61.6 154 61.6L154 0Z"/>
                      </mask>
                    </defs>
                    
                    <path d="M308 154C308 68.9481 239.052 0 154 0C68.9481 0 0 68.9481 0 154C0 239.052 68.9481 308 154 308C239.052 308 308 239.052 308 154ZM61.6 154C61.6 102.969 102.969 61.6 154 61.6C205.031 61.6 246.4 102.969 246.4 154C246.4 205.031 205.031 246.4 154 246.4C102.969 246.4 61.6 205.031 61.6 154Z" fill="#001E60" stroke="#001E60" strokeWidth="2" mask="url(#segment_23)"/>
                    <path d="M154 0C184.458 0 214.233 9.03194 239.558 25.9537C264.883 42.8754 284.622 66.9269 296.277 95.0667C307.933 123.207 310.983 154.171 305.041 184.044C299.099 213.917 284.432 241.357 262.894 262.894C241.357 284.432 213.917 299.099 184.044 305.041C154.171 310.983 123.207 307.933 95.0668 296.277C66.9269 284.622 42.8754 264.883 25.9537 239.558C9.03195 214.233 0 184.458 0 154L61.6 154C61.6 172.275 67.0192 190.14 77.1722 205.335C87.3253 220.53 101.756 232.373 118.64 239.366C135.524 246.36 154.103 248.19 172.026 244.625C189.95 241.059 206.414 232.259 219.337 219.337C232.259 206.414 241.059 189.95 244.625 172.026C248.19 154.102 246.36 135.524 239.366 118.64C232.373 101.756 220.53 87.3252 205.335 77.1722C190.14 67.0192 172.275 61.6 154 61.6L154 0Z" fill="#993EF4" stroke="#993EF4" strokeWidth="2" mask="url(#segment_9)"/>
                    <path d="M154 0C180.759 0 207.057 6.97264 230.301 20.2307C253.545 33.4888 272.933 52.5748 286.554 75.6076C300.176 98.6404 307.561 124.825 307.981 151.581C308.401 178.337 301.843 204.741 288.951 228.19C276.06 251.639 257.281 271.325 234.465 285.307C211.649 299.288 185.583 307.083 158.837 307.924C132.091 308.765 105.588 302.621 81.9389 290.1C58.2899 277.578 38.3119 259.111 23.9735 236.517L75.9841 203.51C84.5871 217.067 96.574 228.147 110.763 235.66C124.953 243.173 140.855 246.859 156.902 246.354C172.95 245.85 188.589 241.173 202.279 232.784C215.968 224.395 227.236 212.584 234.971 198.514C242.706 184.444 246.641 168.602 246.389 152.549C246.136 136.495 241.706 120.784 233.533 106.965C225.36 93.1449 213.727 81.6933 199.78 73.7384C185.834 65.7836 170.056 61.6 154 61.6L154 0Z" fill="#0053E2" stroke="#0053E2" strokeWidth="2" mask="url(#segment_18)"/>
                    <path d="M154 0C193.169 0 230.867 14.9255 259.42 41.7388C287.974 68.5521 305.237 105.238 307.696 144.33C310.156 183.422 297.627 221.983 272.659 252.163C247.692 282.344 212.162 301.876 173.301 306.786L165.581 245.671C188.897 242.726 210.215 231.006 225.195 212.898C240.176 194.79 247.693 171.653 246.218 148.198C244.742 124.743 234.384 102.731 217.252 86.6433C200.12 70.5553 177.502 61.6 154 61.6L154 0Z" fill="#4DBDF5" stroke="#4DBDF5" strokeWidth="2" mask="url(#segment_48)"/>
                    
                    {/* Center text */}
                    <text x="154" y="145" textAnchor="middle" className="text-2xl font-bold fill-foreground">290.2k</text>
                    <text x="154" y="170" textAnchor="middle" className="text-lg fill-foreground">Overall</text>
                  </svg>
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4DBDF5] border border-[#4DBDF5]"></div>
                    <span className="text-base font-bold text-foreground w-10">48%</span>
                    <span className="text-base text-foreground">{t('charts.newBuyers')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0053E2] border border-[#0053E2]"></div>
                    <span className="text-base font-bold text-foreground w-10">18%</span>
                    <span className="text-base text-foreground">{t('charts.purchased1Time')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#993EF4] border border-[#993EF4]"></div>
                    <span className="text-base font-bold text-foreground w-10">9%</span>
                    <span className="text-base text-foreground">{t('charts.purchased2Plus')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#001E60] border border-[#001E60]"></div>
                    <span className="text-base font-bold text-foreground w-10">23%</span>
                    <span className="text-base text-foreground">{t('charts.purchased3Plus')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing by ROAS */}
        <div className="bg-background rounded-lg shadow-[var(--ld-semantic-elevation-100,0_-1px_2px_0_rgba(0,0,0,0.10),0_1px_2px_1px_rgba(0,0,0,0.15))] overflow-hidden">
          <div className="px-6 pt-6 pb-4">
            <h3 className="text-lg font-bold text-foreground">{t('table.topPerformingByROAS')}</h3>
          </div>

          {/* Tabs - LD 3.5 Tab component */}
          <Tabs value={topPerformingTab} onValueChange={setTopPerformingTab}>
            <TabList>
              <Tab value="campaigns">{t('table.topCampaigns')}</Tab>
              <Tab value="adgroups">{t('table.topAdGroups')}</Tab>
              <Tab value="tactics">{t('table.topTactics')}</Tab>
            </TabList>
          </Tabs>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr className="border-t border-b border-border">
                  <th className="px-4 py-3 text-left font-semibold text-foreground">{t('table.campaignName')}</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">{t('metrics.spend')}</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">{t('metrics.roas')}</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">{t('metrics.ctr')}</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">{t('metrics.ecpm')}</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">{t('metrics.impressions')}</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">{t('metrics.delivery')}</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">{t('metrics.inStore')}</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">{t('metrics.pickup')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { nameKey: 'table.backToSchoolElectronics', spend: '$12,450', roas: '8.2x', ctr: '3.1%', ecpm: '$4.25', impressions: '2,929,412', deliveryKey: 'status.inFlight', inStore: '$72,400', pickup: '$29,890' },
                  { nameKey: 'table.holidayGroceryEssentials', spend: '$9,870', roas: '7.5x', ctr: '2.8%', ecpm: '$3.80', impressions: '2,597,368', deliveryKey: 'status.inFlight', inStore: '$54,200', pickup: '$19,725' },
                  { nameKey: 'table.summerOutdoorLiving', spend: '$8,320', roas: '6.9x', ctr: '2.5%', ecpm: '$3.52', impressions: '2,363,636', deliveryKey: 'status.completed', inStore: '$41,600', pickup: '$15,808' },
                  { nameKey: 'table.petSuppliesPromo', spend: '$6,540', roas: '6.1x', ctr: '2.2%', ecpm: '$3.10', impressions: '2,109,677', deliveryKey: 'status.inFlight', inStore: '$28,350', pickup: '$11,544' },
                  { nameKey: 'table.homeOrganizationQ4', spend: '$5,210', roas: '5.8x', ctr: '1.9%', ecpm: '$2.85', impressions: '1,828,070', deliveryKey: 'status.inFlight', inStore: '$21,100', pickup: '$9,118' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted">
                    <td className="px-4 py-3">
                      <Link href="#" className="cursor-pointer">{t(row.nameKey)}</Link>
                    </td>
                    <td className="px-4 py-3 text-foreground">{row.spend}</td>
                    <td className="px-4 py-3 text-foreground">{row.roas}</td>
                    <td className="px-4 py-3 text-foreground">{row.ctr}</td>
                    <td className="px-4 py-3 text-foreground">{row.ecpm}</td>
                    <td className="px-4 py-3 text-foreground">{row.impressions}</td>
                    <td className="px-4 py-3 text-foreground">{t(row.deliveryKey)}</td>
                    <td className="px-4 py-3 text-foreground">{row.inStore}</td>
                    <td className="px-4 py-3 text-foreground">{row.pickup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recommendations Panel */}
      <Panel
        isOpen={recommendationsPanelOpen}
        onClose={() => setRecommendationsPanelOpen(false)}
        title="Recommendations"
        size="large"
        position="right"
        resizable
      >
        <RecommendationsContent
          campaignGoal={campaignGoal}
          onClose={() => setRecommendationsPanelOpen(false)}
        />
      </Panel>

      {/* View More Modal */}
      <Dialog open={viewMoreModalOpen} onOpenChange={setViewMoreModalOpen}>
        <DialogContent className="max-w-[1072px] max-h-[90vh] overflow-y-auto bg-background">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-foreground">
              {t('dashboard.appliedAndDismissed')}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 min-h-[600px]">
            {/* Modal Tabs - LD 3.5 Tab component */}
            <Tabs value={modalTab} onValueChange={(v) => setModalTab(v as 'applied' | 'dismissed')}>
              <TabList>
                <Tab value="applied">{t('recommendations.applied', { count: 8 })}</Tab>
                <Tab value="dismissed">{t('recommendations.dismissed', { count: 4 })}</Tab>
              </TabList>
            </Tabs>

            {/* Applied Recommendations Table */}
            {modalTab === 'applied' && (
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr className="border-t border-b border-border">
                      <th className="px-4 py-3 text-left font-bold text-foreground text-sm">{t('recommendations.recommendation')}</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground text-sm">{t('filters.type')}</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground text-sm">{t('recommendations.dateApplied')}</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground text-sm">{t('recommendations.impact')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Reallocate budget across ad groups</span>
                          <span className="text-xs text-muted-foreground">Campaign name 01</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">Budget</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">01/20/2026</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.impressions')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">35k</span>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Add 15 keywords</span>
                          <span className="text-xs text-muted-foreground">Campaign name 02</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">Targeting</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">01/20/2026</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.clicks')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">2.5%</span>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Add 7 categories</span>
                          <span className="text-xs text-muted-foreground">Campaign name 02</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">Targeting</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">01/20/2026</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.transactions')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">15%</span>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 4 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Extent campaign duration</span>
                          <span className="text-xs text-muted-foreground">Campaign name 03</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">Date</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">01/20/2026</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.impressions')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">13k</span>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 5 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Reallocate budget across ad groups</span>
                          <span className="text-xs text-muted-foreground">Campaign name 01</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <Link href="#" className="text-sm">Data</Link>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">01/20/2026</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.impressions')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">100%</span>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 6 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Add 15 keywords</span>
                          <span className="text-xs text-muted-foreground">Campaign name 02</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <Link href="#" className="text-sm">Data</Link>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">01/20/2026</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.impressions')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">100%</span>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 7 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Add 7 categories</span>
                          <span className="text-xs text-muted-foreground">Campaign name 02</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <Link href="#" className="text-sm">Data</Link>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">01/20/2026</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.transactions')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">100%</span>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* Row 8 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Extent campaign duration</span>
                          <span className="text-xs text-muted-foreground">Campaign name 03</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <Link href="#" className="text-sm">Data</Link>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">01/20/2026</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.transactions')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">100%</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Dismissed Recommendations Table */}
            {modalTab === 'dismissed' && (
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted">
                    <tr className="border-t border-b border-border">
                      <th className="px-4 py-3 text-left font-bold text-foreground text-sm">{t('recommendations.recommendation')}</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground text-sm">{t('filters.type')}</th>
                      <th className="px-4 py-3 text-left font-bold text-foreground text-sm">{t('recommendations.impact')}</th>
                      <th className="px-4 py-3 text-right font-bold text-foreground text-sm">{t('recommendations.action')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Reallocate budget across ad groups</span>
                          <span className="text-xs text-muted-foreground">Campaign name 01</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">Budget</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.impressions')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">27k–35k</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Link href="#" className="inline-flex items-center gap-2 text-sm" onClick={(e) => e.preventDefault()}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00003 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8.00003 2C5.8279 2 3.92536 3.15424 2.8723 4.88282L4.50003 4.88281L4.50004 5.88281L1.50001 5.88284C1.3674 5.88284 1.24022 5.83016 1.14645 5.73639C1.05268 5.64262 1 5.51544 1 5.38283L1.00003 2.49901L2.00003 2.49902L2.00001 4.39245C3.2249 2.3596 5.45369 1 8.00003 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8.00003 15C4.13404 15 1.00003 11.866 1.00003 8L2.00003 8.00007C2.00007 11.3137 4.68634 14 8.00003 14Z" fill="currentColor"/>
                            <path d="M8.05862 4H7.05862V8.8297L10.8617 10.4596L11.2556 9.54043L8.05862 8.1703V4Z" fill="currentColor"/>
                          </svg>
                          {t('recommendations.restore')}
                        </Link>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Add 15 keywords</span>
                          <span className="text-xs text-muted-foreground">Campaign name 02</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">Targeting</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.clicks')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">2.1%–2.5%</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Link href="#" className="inline-flex items-center gap-2 text-sm" onClick={(e) => e.preventDefault()}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00003 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8.00003 2C5.8279 2 3.92536 3.15424 2.8723 4.88282L4.50003 4.88281L4.50004 5.88281L1.50001 5.88284C1.3674 5.88284 1.24022 5.83016 1.14645 5.73639C1.05268 5.64262 1 5.51544 1 5.38283L1.00003 2.49901L2.00003 2.49902L2.00001 4.39245C3.2249 2.3596 5.45369 1 8.00003 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8.00003 15C4.13404 15 1.00003 11.866 1.00003 8L2.00003 8.00007C2.00007 11.3137 4.68634 14 8.00003 14Z" fill="currentColor"/>
                            <path d="M8.05862 4H7.05862V8.8297L10.8617 10.4596L11.2556 9.54043L8.05862 8.1703V4Z" fill="currentColor"/>
                          </svg>
                          {t('recommendations.restore')}
                        </Link>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Add 7 categories</span>
                          <span className="text-xs text-muted-foreground">Campaign name 02</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">Targeting</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.transactions')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">13%–15%</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Link href="#" className="inline-flex items-center gap-2 text-sm" onClick={(e) => e.preventDefault()}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00003 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8.00003 2C5.8279 2 3.92536 3.15424 2.8723 4.88282L4.50003 4.88281L4.50004 5.88281L1.50001 5.88284C1.3674 5.88284 1.24022 5.83016 1.14645 5.73639C1.05268 5.64262 1 5.51544 1 5.38283L1.00003 2.49901L2.00003 2.49902L2.00001 4.39245C3.2249 2.3596 5.45369 1 8.00003 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8.00003 15C4.13404 15 1.00003 11.866 1.00003 8L2.00003 8.00007C2.00007 11.3137 4.68634 14 8.00003 14Z" fill="currentColor"/>
                            <path d="M8.05862 4H7.05862V8.8297L10.8617 10.4596L11.2556 9.54043L8.05862 8.1703V4Z" fill="currentColor"/>
                          </svg>
                          {t('recommendations.restore')}
                        </Link>
                      </td>
                    </tr>

                    {/* Row 4 */}
                    <tr className="border-b border-border hover:bg-muted">
                      <td className="px-4 py-2">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-foreground">Extent campaign duration</span>
                          <span className="text-xs text-muted-foreground">Campaign name 03</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-sm text-foreground">Date</span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-foreground">{t('metrics.impressions')}</span>
                          <div className="flex items-center text-walmart-green">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M8.35359 1.14645C8.15833 0.951184 7.84175 0.951184 7.64648 1.14645L3.14648 5.64645L3.85359 6.35355L7.50003 2.70711V15H8.50003V2.7071L12.1465 6.35355L12.8536 5.64645L8.35359 1.14645Z" fill="currentColor"/>
                            </svg>
                            <span className="text-sm">13k–15k</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Link href="#" className="inline-flex items-center gap-2 text-sm" onClick={(e) => e.preventDefault()}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00003 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8.00003 2C5.8279 2 3.92536 3.15424 2.8723 4.88282L4.50003 4.88281L4.50004 5.88281L1.50001 5.88284C1.3674 5.88284 1.24022 5.83016 1.14645 5.73639C1.05268 5.64262 1 5.51544 1 5.38283L1.00003 2.49901L2.00003 2.49902L2.00001 4.39245C3.2249 2.3596 5.45369 1 8.00003 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8.00003 15C4.13404 15 1.00003 11.866 1.00003 8L2.00003 8.00007C2.00007 11.3137 4.68634 14 8.00003 14Z" fill="currentColor"/>
                            <path d="M8.05862 4H7.05862V8.8297L10.8617 10.4596L11.2556 9.54043L8.05862 8.1703V4Z" fill="currentColor"/>
                          </svg>
                          {t('recommendations.restore')}
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// PH-MPL Professional Teams with Logos
export const PH_MPL_TEAMS = [
  {
    id: 'tlph',
    name: 'Tier One Logical Paradise',
    code: 'TLPH',
    logo: 'https://cdn3.vistek.id/season16/team/TLPH-Logo.png'
  },
  {
    id: 'flcn',
    name: 'Falcon Esports',
    code: 'FLCN',
    logo: 'https://cdn3.vistek.id/season16/team/FLCN-Logo.png'
  },
  {
    id: 'rora',
    name: 'Aurora Philippines',
    code: 'RORA',
    logo: 'https://cdn3.vistek.id/season16/team/RORA-Logo.png'
  },
  {
    id: 'apbr',
    name: 'Aura PH Blacklist',
    code: 'APBR',
    logo: 'https://cdn3.vistek.id/season16/team/APBR-Logo.png'
  },
  {
    id: 'onic',
    name: 'ONIC Esports',
    code: 'ONIC',
    logo: 'https://cdn3.vistek.id/season16/team/ONIC-Logo.png'
  },
  {
    id: 'omg',
    name: 'Oh My God Esports',
    code: 'OMG',
    logo: 'https://cdn3.vistek.id/season16/team/OMG-Logo.png'
  },
  {
    id: 'tnc',
    name: 'TNC Pro Team',
    code: 'TNC',
    logo: 'https://cdn3.vistek.id/season16/team/TNC-Logo.png'
  },
  {
    id: 'twis',
    name: 'Twitch Rivals',
    code: 'TWIS',
    logo: 'https://cdn3.vistek.id/season16/team/TWIS-Logo.png'
  },
  {
    id: 'nxp',
    name: 'NXP Esports',
    code: 'NXP',
    logo: 'https://cdn3.vistek.id/season16/team/NXP-Logo.png'
  },
  {
    id: 'benj',
    name: 'Benj Esports',
    code: 'BENJ',
    logo: 'https://cdn3.vistek.id/season16/team/BENJ-Logo.png'
  },
  {
    id: 'blkl',
    name: 'Blacklist International',
    code: 'BLKL',
    logo: 'https://cdn3.vistek.id/season16/team/BLKL-Logo.png'
  },
  {
    id: 'rmx',
    name: 'Remix Esports',
    code: 'RMX',
    logo: 'https://cdn3.vistek.id/season16/team/RMX-Logo.png'
  },
];

export function getPHMLTeamByCode(code: string) {
  return PH_MPL_TEAMS.find(team => team.code === code);
}

export function getPHMLTeamById(id: string) {
  return PH_MPL_TEAMS.find(team => team.id === id);
}

export function getAllPHMLTeams() {
  return PH_MPL_TEAMS;
}
